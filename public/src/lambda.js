"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_lambda_1 = __importDefault(require("@fastify/aws-lambda"));
const fastify_1 = __importDefault(require("fastify"));
const server = require("./server");
// Instantiate Fastify with some config
const proxyServer = (0, fastify_1.default)();
proxyServer.register(server);
const proxy = (0, aws_lambda_1.default)(proxyServer);
// or
// const proxy = awsLambdaFastify(server, { binaryMimeTypes: ['application/octet-stream'] })
exports.handler = proxy;
