"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
//#endregion
dotenv_1.default.config();
const { CONNECT_DB } = process.env;
const mongoClient = new mongodb_1.MongoClient(CONNECT_DB);
const dumpster = mongoClient.db(constants_1.dumpsterDB).collection(constants_1.dumpsterDB);
dumpster.createIndex({ title: "text" });
const debrisRoute = (server, options, done) => {
    //#region GETTERS
    //#region SINGLE_PARAM
    server.post("/title", async (request, reply) => {
        const { title: wantedTitle } = request.body;
        options.debugLogs &&
            console.log(`Requested Title: ${wantedTitle}\n\nOutput:\n`);
        const items = await dumpster
            .find({ title: { $regex: wantedTitle, $options: "i" } })
            .toArray();
        (0, utils_1.logAndReply)(reply, items, options.debugLogs);
    });
    const arrayToString = (array) => {
        let str = "";
    };
    server.post("/tag", async (request, reply) => {
        const { wantedTags } = request.body;
        const tags = wantedTags;
        options.debugLogs && console.log(`Requested Tags: ${tags}\n\n`);
        const allTagItems = await (0, utils_1.checkAllTags)(dumpster, tags, {}, options.debugLogs);
        (0, utils_1.logAndReply)(reply, allTagItems, options.debugLogs);
    });
    server.get("/id/:id", async (request, reply) => {
        const { id } = request.params;
        options.debugLogs && console.log(`Requested ID: ${id}\n\nOutput:\n`);
        const item = await dumpster.findOne({ _id: new mongodb_1.ObjectId(id) });
        (0, utils_1.logAndReply)(reply, item, options.debugLogs);
    });
    server.post("/dumpster", async (request, reply) => {
        const { dumpster: wantedDumpster } = request.body;
        options.debugLogs &&
            console.log(`Requested Dumpster: ${wantedDumpster}\n\nOutput:\n`);
        const items = await dumpster.find({ dumpster: wantedDumpster }).toArray();
        (0, utils_1.logAndReply)(reply, items, options.debugLogs);
    });
    //#endregion SINGLE_PARAM
    //#region DOUBLE_PARAM
    server.post("/dumpster&title", async (request, reply) => {
        const { title: wantedTitle, dumpster: wantedDumpster } = request.body;
        options.debugLogs &&
            console.log(`Requested Dumpster: ${wantedDumpster}\nRequested Title: ${wantedTitle}
          \n\nOutput:\n`);
        const items = await dumpster
            .find({
            title: { $regex: wantedTitle, $options: "i" },
            dumpster: wantedDumpster
        })
            .toArray();
        (0, utils_1.logAndReply)(reply, items, options.debugLogs);
    });
    server.post("/dumpster&tag/", async (request, reply) => {
        const { wantedTags, dumpster: wantedDumpster } = request.body;
        const tags = wantedTags;
        options.debugLogs &&
            console.log(`Requested Dumpster: ${wantedDumpster}\nRequested Tag: ${tags}
          \n\nOutput:\n`);
        const allTagItems = await (0, utils_1.checkAllTags)(dumpster, tags, {
            dumpster: wantedDumpster
        }, options.debugLogs);
        (0, utils_1.logAndReply)(reply, allTagItems, options.debugLogs);
    });
    server.post("/tag&title", async (request, reply) => {
        const { wantedTags, title: wantedTitle } = request.body;
        const tags = wantedTags;
        options.debugLogs &&
            console.log(`Requested Tags: ${wantedTags}\nRequested Title: ...${wantedTitle}...
          \n\nOutput:\n`);
        const allTagItems = await (0, utils_1.checkAllTags)(dumpster, tags, {
            title: { $regex: wantedTitle, $options: "i" }
        }, options.debugLogs);
        (0, utils_1.logAndReply)(reply, allTagItems, options.debugLogs);
    });
    //#endregion DOUBLE_PARAM
    //#region TRIPLE_PARAM
    server.post("/dumpster&tag&title", async (request, reply) => {
        const { wantedTags, title: wantedTitle, dumpster: wantedDumpster } = request.body;
        const tags = wantedTags;
        options.debugLogs &&
            console.log(`Requested Dumpster: ${wantedDumpster}\nRequested Tags: ${wantedTags}`, `\nRequested Title: ...${wantedTitle}...\n\nOutput:\n`);
        const allTagItems = await (0, utils_1.checkAllTags)(dumpster, tags, {
            title: { $regex: wantedTitle, $options: "i" },
            dumpster: wantedDumpster
        }, options.debugLogs);
        (0, utils_1.logAndReply)(reply, allTagItems, options.debugLogs);
    });
    //#endregion TRIPLE_PARAM
    //#endregion GETTERS
    server.post("/", async (request, reply) => {
        const { title, wantedDumpster, tags, keywords, links, summary } = request.body;
        const newDebris = {
            title,
            dumpster: wantedDumpster,
            tags,
            keywords,
            links,
            summary
        };
        dumpster.insertOne(newDebris);
        (0, utils_1.logAndReply)(reply, newDebris, options.debugLogs);
    });
    server.put("/", async (request, reply) => {
        const { id, keywords, links, summary, tags, title, wantedDumpster } = request.body;
        const updatedDebris = {
            ...(title && { title }),
            ...(dumpster && { dumpster: wantedDumpster }),
            ...(tags && { tags }),
            ...(keywords && { keywords }),
            ...(links && { links }),
            ...(summary && { summary })
        };
        const prevItem = await dumpster.findOne({ _id: new mongodb_1.ObjectId(id) });
        options.debugLogs && console.log("PREV:\n", prevItem);
        dumpster.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: updatedDebris }, async (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            const updatedItem = await dumpster.findOne({ _id: new mongodb_1.ObjectId(id) });
            (0, utils_1.logAndReply)(reply, updatedItem, options.debugLogs, {
                prefix: "UPDATED:\n"
            });
        });
    });
    server.delete("/", async (request, reply) => {
        const { id } = request.body;
        dumpster.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        (0, utils_1.logAndReply)(reply, `deleted item ${id}`, options.debugLogs);
    });
    done();
};
exports.default = debrisRoute;
