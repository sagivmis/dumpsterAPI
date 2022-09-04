"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const debrisRoute_1 = __importDefault(require("./route/debris/debrisRoute"));
const cors_1 = __importDefault(require("@fastify/cors"));
dotenv_1.default.config();
const { PORT, DEBUG_LOGS } = process.env;
const server = (0, fastify_1.default)();
//plugins
server.register(debrisRoute_1.default, { prefix: "/debris", debugLogs: DEBUG_LOGS });
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
server.register(cors_1.default, {
    origin: "*"
});
const runServer = () => {
    server.listen({ port: PORT || 8080 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};
server.get("/", (request, reply) => {
    reply.send("Welcome to dumpsterAPI");
});
runServer();
