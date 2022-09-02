import { FastifyPluginCallback, FastifyReply } from "fastify"
import {
  Debris,
  GetDebrisDumpsterParams,
  GetDebrisDumpsterTagParams,
  GetDebrisDumpsterTagTitleParams,
  GetDebrisDumpsterTitleParams,
  GetDebrisIDParams,
  GetDebrisTagsBody,
  GetDebrisTagsParams,
  GetDebrisTitleParams,
  GetDebrisTitleTagParams,
  LogSuffixPrefix,
  Tag
} from "../../types"
import { PostDebrisBodySchema } from "../../types/PostDebrisBody"
import { ObjectId } from "mongodb"
import { MongoClient } from "mongodb"
import { Collection } from "mongodb"
import { dumpsterDB } from "../../constants"
import { DeleteDebrisBodySchema } from "../../types/DeleteDebrisBody"
import utils from "../../utils"
import { UpdateDebrisBodySchema } from "../../types/UpdateDebrisBody"
import { GetDebrisByTagBodySchema } from "../../types/GetDebrisTagBody"

const dotenv = require("dotenv")
dotenv.config()

const { CONNECT_DB } = process.env

const mongoClient = new MongoClient(CONNECT_DB)

const dumpster: Collection = mongoClient.db(dumpsterDB).collection(dumpsterDB)

dumpster.createIndex({ title: "text" })

interface IDebrisRouteOpts {
  debugLogs: boolean
}

const debrisRoute: FastifyPluginCallback<IDebrisRouteOpts> = (
  server,
  options,
  done
) => {
  //#region GETTERS
  //#region SINGLE_PARAM
  server.get<{ Params: GetDebrisTitleParams }>(
    "/title/:wantedTitle",
    async (request, reply) => {
      const { wantedTitle } = request.params
      options.debugLogs &&
        console.log(`Requested Title: ${wantedTitle}\n\nOutput:\n`)
      const items = await dumpster
        .find({ title: { $regex: wantedTitle, $options: "i" } })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )

  const arrayToString = (array: Tag[]) => {
    let str = ""
  }

  server.get<{ Body: GetDebrisByTagBodySchema }>(
    "/tag",
    async (request, reply) => {
      const { wTags } = request.body
      const tags = wTags as Tag[]
      options.debugLogs &&
        console.log(`Requested Tag: ${arrayToString(tags)}\n\nOutput:\n`)
      const allTagItems: any = []

      tags.forEach(async (wantedTag) => {
        options.debugLogs && console.log("Wanted Tag: ", wantedTag)
        allTagItems.push(
          ...(await dumpster.find({ tags: { wantedTag } }).toArray())
        )
      })

      utils.logAndReply(reply, allTagItems, options.debugLogs)
    }
  )

  server.get<{ Params: GetDebrisIDParams }>(
    "/id/:id",
    async (request, reply) => {
      const { id } = request.params
      options.debugLogs && console.log(`Requested ID: ${id}\n\nOutput:\n`)
      const item = await dumpster.findOne({ _id: new ObjectId(id) })

      utils.logAndReply(reply, item, options.debugLogs)
    }
  )

  server.get<{ Params: GetDebrisDumpsterParams }>(
    "/dumpster/:wantedDumpster",
    async (request, reply) => {
      const { wantedDumpster } = request.params
      options.debugLogs &&
        console.log(`Requested Dumpster: ${wantedDumpster}\n\nOutput:\n`)
      const items = await dumpster
        .find({ dumpster: { section: wantedDumpster } })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )
  //#endregion SINGLE_PARAM

  //#region DOUBLE_PARAM

  server.get<{ Params: GetDebrisDumpsterTitleParams }>(
    "/dumpster&title/:wantedDumpster/:wantedTitle",
    async (request, reply) => {
      const { wantedTitle, wantedDumpster } = request.params
      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Title: ${wantedTitle}\n\nOutput:\n`
        )
      const items = await dumpster
        .find({
          title: { $regex: wantedTitle, $options: "i" },
          dumpster: { section: wantedDumpster }
        })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )

  server.get<{ Params: GetDebrisDumpsterTagParams }>(
    "/dumpster&tag/:wantedDumpster/:wantedTag",
    async (request, reply) => {
      const { wantedTag, wantedDumpster } = request.params
      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Tag: ${wantedTag}\n\nOutput:\n`
        )
      const items = await dumpster
        .find({
          tags: { wantedTag },
          dumpster: { section: wantedDumpster }
        })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )

  server.get<{ Params: GetDebrisTitleTagParams }>(
    "/tag&title/:wantedTag/:wantedTitle",
    async (request, reply) => {
      const { wantedTag, wantedTitle } = request.params
      options.debugLogs &&
        console.log(
          `Requested Tag: ${wantedTag}\nRequested Title: ...${wantedTitle}...\n\nOutput:\n`
        )
      const items = await dumpster
        .find({
          title: { $regex: wantedTitle, $options: "i" },
          tags: { wantedTag }
        })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )

  //#endregion DOUBLE_PARAM

  //#region TRIPLE_PARAM

  server.get<{ Params: GetDebrisDumpsterTagTitleParams }>(
    "/dumpster&tag&title/:wantedDumpster/:wantedTag/:wantedTitle",
    async (request, reply) => {
      const { wantedTag, wantedTitle, wantedDumpster } = request.params

      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Tag: ${wantedTag}\n`,
          `Requested Title: ...${wantedTitle}...\n\nOutput:\n`
        )
      const items = await dumpster
        .find({
          title: { $regex: wantedTitle, $options: "i" },
          tags: { wantedTag },
          dumpster: { section: wantedDumpster }
        })
        .toArray()

      utils.logAndReply(reply, items, options.debugLogs)
    }
  )

  //#endregion TRIPLE_PARAM

  //#endregion GETTERS

  //change to post once started using my app \ postman
  server.get("/newDebris", async (request, reply) => {
    const newDebris: Debris = {
      title: "Publish a new site",
      tags: ["development"],
      dumpster: { section: "fullstack" }
    }
    //check if dumpster contains a doc like this , based on combination of
    //title and dumpster
    dumpster.insertOne(newDebris)
    utils.logAndReply(reply, newDebris, options.debugLogs)
  })

  server.post<{ Body: PostDebrisBodySchema }>("/", async (request, reply) => {
    const { title, wantedDumpster, tags, keywords, links, summary } =
      request.body
    console.log(title, wantedDumpster, tags, keywords, links, summary)
    const newDebris = {
      title,
      wantedDumpster,
      tags,
      keywords,
      links,
      summary
    }
    dumpster.insertOne(newDebris)
    utils.logAndReply(reply, newDebris, options.debugLogs)
  })

  server.put<{ Body: UpdateDebrisBodySchema }>("/", async (request, reply) => {
    const { id, keywords, links, summary, tags, title, wantedDumpster } =
      request.body
    const updatedDebris = {
      title,
      wantedDumpster,
      tags,
      keywords,
      links,
      summary
    }
    const prevItem = await dumpster.findOne({ _id: new ObjectId(id) })

    options.debugLogs && console.log("PREV:\n", prevItem)

    dumpster.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedDebris },
      async (err, res) => {
        if (err) {
          console.log(err)
          throw err
        }
        Object.keys(updatedDebris).forEach((key) => {
          if (
            (updatedDebris as any)[key] === undefined &&
            (updatedDebris as any)[key]
          )
            (updatedDebris as any)[key] = (prevItem as any)[key]
        })

        console.log("UPDATED:\n")

        const updatedItem = await dumpster.findOne({ _id: id })
        // console.log(updatedItem)
        utils.logAndReply(reply, updatedDebris, options.debugLogs)
      }
    )
  })

  server.delete<{ Body: DeleteDebrisBodySchema }>(
    "/",
    async (request, reply) => {
      const { id } = request.body
      dumpster.deleteOne({ _id: new ObjectId(id) })
      utils.logAndReply(reply, `deleted item`, options.debugLogs)
    }
  )

  // server.delete("/dumpster", async (request, reply) => {
  //   dumpster.deleteMany({  })
  //   utils.logAndReply(reply, `deleted items (many)`, options.debugLogs)
  // })

  // server.delete("/tag", async (request, reply) => {
  //   dumpster.deleteMany({  })
  //   utils.logAndReply(reply, `deleted items (many)`, options.debugLogs)
  // })

  // server.delete("/", async (request, reply) => {
  //   dumpster.deleteMany({  })
  //   utils.logAndReply(reply, `deleted items (many)`, options.debugLogs)
  // })

  done()
}

export default debrisRoute
