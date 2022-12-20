import fastify from "fastify"
import dotenv from "dotenv"
import debrisRoute from "./route/debris/debrisRoute"
import cors from "@fastify/cors"
import usersRoute from "./route/user/userRoute"
import fs from "fs"
import path from "path"
import characterRoute from "./route/characters/charactersRoute"

dotenv.config()
const { PORT, DEBUG_LOGS, HOST } = process.env
const server = fastify()
// const server = fastify({
//   https: {
//     key: fs.readFileSync(path.join(__dirname, "server.key")),
//     cert: fs.readFileSync(path.join(__dirname, "server.crt"))
//   }
// })

//plugins
server.register(debrisRoute, { prefix: "/debris", debugLogs: DEBUG_LOGS })
server.register(usersRoute, { prefix: "/users", debugLogs: DEBUG_LOGS })
server.register(characterRoute, {
  prefix: "/characters",
  debugLogs: DEBUG_LOGS
})

server.register(cors, {
  origin: "*"
})

const runServer = async () => {
  server.listen(
    { port: PORT || 8080, host: HOST || "0.0.0.0" },
    (_, address) => {
      console.log(address)
    }
  )
  console.log(`Server listening at port ${PORT || 8080}`)
}

server.get("/", (request, reply) => {
  reply.send("Welcome to dumpsterAPI")
})
// default export server

if (require.main === module) {
  runServer()
} else {
  // required as a module => executed on aws lambda
  module.exports = server
}
