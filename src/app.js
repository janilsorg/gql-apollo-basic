import 'colors'
import 'dotenv/config'
import './setup/db.js'
import { ApolloServer } from '@apollo/server'
import  typeDefs  from './graphql/schema/index.js'
import  resolvers  from './graphql/resolvers/index.js'

const API_PORT = process.env.API_PORT || 4000

const server = new ApolloServer({ typeDefs,resolvers })

export default server;