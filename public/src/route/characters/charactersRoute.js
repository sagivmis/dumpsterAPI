"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const Character_1 = require("../../types/Character");
dotenv_1.default.config();
const { CONNECT_DB } = process.env;
const mongoClient = new mongodb_1.MongoClient(CONNECT_DB);
const characters = mongoClient
    .db(constants_1.charactersDB)
    .collection(constants_1.charactersDB);
const users = mongoClient.db(constants_1.usersDB).collection(constants_1.usersDB);
const characterRoute = (server, options, done) => {
    server.get("/", async (request, reply) => {
        (0, utils_1.logAndReply)(reply, "Character's route");
    });
    server.post("/character", async (request, reply) => {
        const { userId, characterClass, name, mainAttribute, secondaryAttribute } = request.body;
        const user = await users
            .find({ id: { $regex: userId, $options: "i" } })
            .toArray();
        options.debugLogs && console.log(`Requested ID: ${userId}\n\nOutput:\n`);
        let newCharacter = {};
        switch (characterClass) {
            case "archer":
                newCharacter = new Character_1.Archer(name, mainAttribute, secondaryAttribute);
                break;
            case "warrior":
                newCharacter = new Character_1.Warrior(name, mainAttribute, secondaryAttribute);
                break;
            case "healer":
                newCharacter = new Character_1.Healer(name, mainAttribute, secondaryAttribute);
                break;
            case "magician":
                newCharacter = new Character_1.Magician(name, mainAttribute, secondaryAttribute);
                break;
        }
        characters.insertOne(newCharacter);
        console.log(newCharacter);
        // const updatedUser = {
        (0, utils_1.logAndReply)(reply, newCharacter, options.debugLogs);
        // characters: [<id />]
        // }
    });
    done();
};
exports.default = characterRoute;
