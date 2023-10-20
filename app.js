const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');

// Datos de ejemplo (en lugar de una base de datos)
const books = [
  { id: 1, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'Matar a un ruiseñor', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
];

// Definir el tipo de libro
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  },
});

// Crear un esquema GraphQL
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      books: {
        type: new GraphQLList(BookType),
        resolve: () => books,
      },
    },
  }),
});

const app = express();

// Ruta para GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Habilita la interfaz de GraphiQL para probar consultas
  })
);

app.listen(3000, () => {
  console.log('Servidor GraphQL escuchando en http://localhost:3000/graphql');
});
