import awsLambdaFastify from "@fastify/aws-lambda"
import fastify from "fastify"
const server = require("../../../src/server")

// Instantiate Fastify with some config
const proxyServer = fastify()
proxyServer.register(server)

const proxy = awsLambdaFastify(proxyServer)
// or
// const proxy = awsLambdaFastify(server, { binaryMimeTypes: ['application/octet-stream'] })

exports.handler = proxy
