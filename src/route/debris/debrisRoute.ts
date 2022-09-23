//#region IMPORTS
import { FastifyPluginCallback } from "fastify"
import { ObjectId, MongoClient, Collection } from "mongodb"
import dotenv from "dotenv"
import { checkAllTags, logAndReply } from "../../utils"
import { GetDebrisIDParams, Tag } from "../../types"
import { dumpsterDB } from "../../constants"
import {
  GetDebrisByDumpsterAndTagBodySchema,
  DeleteDebrisBodySchema,
  GetDebrisByDumpsterAndTitleBodySchema,
  GetDebrisByDumpsterBodySchema,
  GetDebrisByDumpsterTagAndTitleBodySchema,
  GetDebrisByTagAndTitleBodySchema,
  GetDebrisByTagBodySchema,
  GetDebrisByTitleBodySchema,
  PostDebrisBodySchema,
  UpdateDebrisBodySchema
} from "../../schemas/ts/debris"
//#endregion

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
  server.post<{ Body: GetDebrisByTitleBodySchema }>(
    "/title",
    async (request, reply) => {
      const { title: wantedTitle } = request.body
      options.debugLogs &&
        console.log(`Requested Title: ${wantedTitle}\n\nOutput:\n`)
      const items = await dumpster
        .find({ title: { $regex: wantedTitle, $options: "i" } })
        .toArray()

      logAndReply(reply, items, options.debugLogs)
    }
  )

  const arrayToString = (array: Tag[]) => {
    let str = ""
  }

  server.post<{ Body: GetDebrisByTagBodySchema }>(
    "/tag",
    async (request, reply) => {
      const { wantedTags } = request.body
      const tags = wantedTags as Tag[]
      options.debugLogs && console.log(`Requested Tags: ${tags}\n\n`)
      const allTagItems: any = await checkAllTags(
        dumpster,
        tags,
        {},
        options.debugLogs
      )

      logAndReply(reply, allTagItems, options.debugLogs)
    }
  )

  server.get<{ Params: GetDebrisIDParams }>(
    "/id/:id",
    async (request, reply) => {
      const { id } = request.params
      options.debugLogs && console.log(`Requested ID: ${id}\n\nOutput:\n`)
      const item = await dumpster.findOne({ _id: new ObjectId(id) })

      logAndReply(reply, item, options.debugLogs)
    }
  )

  server.post<{ Body: GetDebrisByDumpsterBodySchema }>(
    "/dumpster",
    async (request, reply) => {
      const { dumpster: wantedDumpster } = request.body
      options.debugLogs &&
        console.log(`Requested Dumpster: ${wantedDumpster}\n\nOutput:\n`)
      const items = await dumpster.find({ dumpster: wantedDumpster }).toArray()

      logAndReply(reply, items, options.debugLogs)
    }
  )
  //#endregion SINGLE_PARAM

  //#region DOUBLE_PARAM

  server.post<{ Body: GetDebrisByDumpsterAndTitleBodySchema }>(
    "/dumpster&title",
    async (request, reply) => {
      const { title: wantedTitle, dumpster: wantedDumpster } = request.body
      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Title: ${wantedTitle}
          \n\nOutput:\n`
        )
      const items = await dumpster
        .find({
          title: { $regex: wantedTitle, $options: "i" },
          dumpster: wantedDumpster
        })
        .toArray()

      logAndReply(reply, items, options.debugLogs)
    }
  )

  server.post<{ Body: GetDebrisByDumpsterAndTagBodySchema }>(
    "/dumpster&tag/",
    async (request, reply) => {
      const { wantedTags, dumpster: wantedDumpster } = request.body
      const tags = wantedTags as Tag[]
      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Tag: ${tags}
          \n\nOutput:\n`
        )

      const allTagItems: any = await checkAllTags(
        dumpster,
        tags,
        {
          dumpster: wantedDumpster
        },
        options.debugLogs
      )

      logAndReply(reply, allTagItems, options.debugLogs)
    }
  )

  server.post<{ Body: GetDebrisByTagAndTitleBodySchema }>(
    "/tag&title",
    async (request, reply) => {
      const { wantedTags, title: wantedTitle } = request.body
      const tags = wantedTags as Tag[]
      options.debugLogs &&
        console.log(
          `Requested Tags: ${wantedTags}\nRequested Title: ...${wantedTitle}...
          \n\nOutput:\n`
        )

      const allTagItems: any = await checkAllTags(
        dumpster,
        tags,
        {
          title: { $regex: wantedTitle, $options: "i" }
        },
        options.debugLogs
      )

      logAndReply(reply, allTagItems, options.debugLogs)
    }
  )

  //#endregion DOUBLE_PARAM

  //#region TRIPLE_PARAM

  server.post<{ Body: GetDebrisByDumpsterTagAndTitleBodySchema }>(
    "/dumpster&tag&title",
    async (request, reply) => {
      const {
        wantedTags,
        title: wantedTitle,
        dumpster: wantedDumpster
      } = request.body
      const tags = wantedTags as Tag[]

      options.debugLogs &&
        console.log(
          `Requested Dumpster: ${wantedDumpster}\nRequested Tags: ${wantedTags}`,
          `\nRequested Title: ...${wantedTitle}...\n\nOutput:\n`
        )

      const allTagItems: any = await checkAllTags(
        dumpster,
        tags,
        {
          title: { $regex: wantedTitle, $options: "i" },
          dumpster: wantedDumpster
        },
        options.debugLogs
      )
      logAndReply(reply, allTagItems, options.debugLogs)
    }
  )

  //#endregion TRIPLE_PARAM

  //#endregion GETTERS

  server.post<{ Body: PostDebrisBodySchema }>("/", async (request, reply) => {
    const { title, wantedDumpster, tags, keywords, links, summary } =
      request.body

    const newDebris = {
      title,
      dumpster: wantedDumpster,
      tags,
      keywords,
      links,
      summary
    }
    dumpster.insertOne(newDebris)
    logAndReply(reply, newDebris, options.debugLogs)
  })

  server.put<{ Body: UpdateDebrisBodySchema }>("/", async (request, reply) => {
    const { id, keywords, links, summary, tags, title, wantedDumpster } =
      request.body
    const updatedDebris = {
      ...(title && { title }),
      ...(dumpster && { dumpster: wantedDumpster }),
      ...(tags && { tags }),
      ...(keywords && { keywords }),
      ...(links && { links }),
      ...(summary && { summary })
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
        const updatedItem = await dumpster.findOne({ _id: new ObjectId(id) })
        logAndReply(reply, updatedItem, options.debugLogs, {
          prefix: "UPDATED:\n"
        })
      }
    )
  })

  server.delete<{ Body: DeleteDebrisBodySchema }>(
    "/",
    async (request, reply) => {
      const { id } = request.body
      dumpster.deleteOne({ _id: new ObjectId(id) })
      logAndReply(reply, `deleted item ${id}`, options.debugLogs)
    }
  )

  done()
}

export default debrisRoute
