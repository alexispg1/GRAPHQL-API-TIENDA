var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');

var ProductModel = require('../models').Product;

var productType = new GraphQLObjectType({
    name: "product",
    fields: function() {
        return {
            id: {
                type: GraphQLInt
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            createdAt: {
                type: GraphQLDate
            },
            updatedAt: {
                type: GraphQLDate
            }
        };
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            products: {
                type: new GraphQLList(productType),
                resolve: function () {
                    const products = ProductModel.findAll()
                    if (!products) {
                        throw new Error('Error')
                    }
                    return products
                }
            },
            product: {
                type: productType,
                args: {
                    id: {
                        name: 'id',
                        type: GraphQLInt
                    }
                },
                resolve: function (root, params) {
                    const productDetails = ProductModel.findByPk(params.id)
                    if (!productDetails) {
                        throw new Error('Error')
                    }
                    return productDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addProduct: {
                type: productType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const productModel = new ProductModel(params);
                    const newProduct = productModel.save();
                    if (!newProduct) {
                        throw new Error('Error');
                    }
                    return newProduct
                }
            },
            updateProduct: {
                type: productType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    name: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    }
                },
                resolve(root, params) {
                    return ProductModel
                    .findByPk(params.id)
                    .then(product => {
                        if (!product) {
                            throw new Error('Not found');
                        }
                        return product
                        .update({
                            name: params.name || product.name,
                            description: params.description || product.description
                        })
                        .then(() => { return product; })
                        .catch((error) => { throw new Error(error); });
                    })
                    .catch((error) => { throw new Error(error); });
                }
            },
            removeProduct: {
                type: productType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return ProductModel
                    .findByPk(params.id)
                    .then(product => {
                        if (!product) {
                            throw new Error('Not found');
                        }
                        return product
                        .destroy()
                        .then(() => { return product; })
                        .catch((error) => { throw new Error(error); });
                    })
                    .catch((error) => { throw new Error(error); });
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
