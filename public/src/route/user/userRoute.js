"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const users_1 = require("../../schemas/users");
dotenv_1.default.config();
const { CONNECT_DB } = process.env;
const mongoClient = new mongodb_1.MongoClient(CONNECT_DB);
const users = mongoClient.db(constants_1.usersDB).collection(constants_1.usersDB);
users.createIndex({ id: "text" });
const usersRoute = (server, options, done) => {
    server.post("/id", { schema: { body: users_1.GetUserIdBody } }, async (request, reply) => {
        const { userId } = request.body;
        const currentUser = await users.find({ id: userId }).toArray();
        options.debugLogs && console.log(`Requested ID: ${userId}\n\nOutput:\n`);
        (0, utils_1.logAndReply)(reply, currentUser, options.debugLogs);
    });
    server.post("/", { schema: { body: users_1.PostNewUser } }, async (request, reply) => {
        const { name, password, userId, isAdmin, withPermissions } = request.body;
        const newUser = {
            id: userId,
            password,
            name,
            isAdmin,
            withPermissions
        };
        users.insertOne(newUser);
        (0, utils_1.logAndReply)(reply, newUser, options.debugLogs);
    });
    done();
};
exports.default = usersRoute;
