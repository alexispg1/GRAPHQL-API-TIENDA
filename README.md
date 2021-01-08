
# QUERYS.

1. GET 
all products
{
  products {
    id,
    name, 
    description
  }
}

2. GET 
product by id
{
product(id:"1"){
  id,
  name,
  description
 }
}

3. POST 
add a product 
mutation {
  addProduct(name:"doritos nacho ",description:"600 grms") {
  name,
  description
  }
}  

4. PUT
update a product
mutation {
  updateProduct(id: 1, name:"Juicy Fruits",description:"600 ml") {
    name,
    description
  }
}
  

5. DELETE
delete a product  
mutation {
  removeProduct(id: 2) {
    name,
    description
  }
}

# START PROJECT.
1. instalar mysql comando: npm install mysql2 --save.
2. npm install -g sequelize-cli
3. sequelize db:create 
4. sequelize db:migrate
5. npm start



