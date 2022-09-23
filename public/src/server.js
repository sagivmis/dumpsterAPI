"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const debrisRoute_1 = __importDefault(require("./route/debris/debrisRoute"));
const cors_1 = __importDefault(require("@fastify/cors"));
const userRoute_1 = __importDefault(require("./route/user/userRoute"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const { PORT, DEBUG_LOGS, HOST } = process.env;
const server = (0, fastify_1.default)({
    https: {
        key: fs_1.default.readFileSync(path_1.default.join(__dirname, "server.key")),
        cert: fs_1.default.readFileSync(path_1.default.join(__dirname, "server.crt"))
    }
});
//plugins
server.register(debrisRoute_1.default, { prefix: "/debris", debugLogs: DEBUG_LOGS });
server.register(userRoute_1.default, { prefix: "/users", debugLogs: DEBUG_LOGS });
server.register(cors_1.default, {
    origin: "*"
});
const runServer = async () => {
    server.listen({ port: PORT || 8080, host: HOST || "0.0.0.0" }, (_, address) => {
        console.log(address);
    });
    console.log(`Server listening at port ${PORT || 8080}`);
};
server.get("/", (request, reply) => {
    reply.send("Welcome to dumpsterAPI");
});
runServer();
