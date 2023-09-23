import 'colors'
import 'dotenv/config'
import './src/setup/db.js'
import { startStandaloneServer } from '@apollo/server/standalone'
import context from './src/context/context.js'


const API_PORT = process.env.SERVER_PORT || 4000

import server from './src/app.js'

const { url } = await startStandaloneServer(server, {
    // context: async({ req }) => ({ token: req.headers.token }),
    context: context,
    listen: {port: API_PORT}
})

console.log(`${'Server is listen at '.green } ${url.yellow}`)
console.log(`${'Query at '.magenta } ${'https://studio.apollographql.com/dev'.yellow}`)
