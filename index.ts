import fastify from "fastify"
import dotenv from "dotenv"
import debrisRoute from "./route/debris/debrisRoute"
dotenv.config()
const { PORT, DEBUG_LOGS } = process.env
const server = fastify()

//plugins
server.register(debrisRoute, { prefix: "/debris", debugLogs: DEBUG_LOGS })

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
