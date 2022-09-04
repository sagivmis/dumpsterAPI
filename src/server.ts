import fastify from "fastify"
import dotenv from "dotenv"
import debrisRoute from "./route/debris/debrisRoute"
import swagger from "@fastify/swagger"
import cors from "@fastify/cors"

dotenv.config()
const { PORT, DEBUG_LOGS, HOST } = process.env
const server = fastify()

//plugins
server.register(debrisRoute, { prefix: "/debris", debugLogs: DEBUG_LOGS })
// server.register(swagger, {
//   routePrefix: "/swagger",
//   swagger: {
//     info: {
//       title: "Dumpster API",
//       description: "Dumpster API with MongoDB",
//       version: "1.0.0"
//     },
//     host: `localhost:${PORT || 8080}`,
//     schemes: ["http"],
//     consumes: ["application/json"],
//     produces: ["application/json"]
//   },
//   exposeRoute: true
// })
server.register(cors, {
  origin: "*"
})

const runServer = async () => {
  server.listen({ port: PORT || 8080, host: HOST || "0.0.0.0" })
  console.log(`Server listening at port ${PORT || 8080}`)
}

server.get("/", (request, reply) => {
  reply.send("Welcome to dumpsterAPI")
})

runServer()
