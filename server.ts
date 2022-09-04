import fastify from "fastify"
import dotenv from "dotenv"
import debrisRoute from "./route/debris/debrisRoute"
import swagger from "@fastify/swagger"

dotenv.config()
const { PORT, DEBUG_LOGS } = process.env
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

const runServer = () => {
  server.listen({ port: PORT || 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

server.get("/", (request, reply) => {
  reply.send("Welcome to dumpsterAPI")
})

runServer()
