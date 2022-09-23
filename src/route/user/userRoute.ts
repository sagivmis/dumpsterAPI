//#region IMPORTS
import { FastifyPluginCallback } from "fastify"
import { ObjectId, MongoClient, Collection } from "mongodb"
import dotenv from "dotenv"
import { logAndReply } from "../../utils"
import { usersDB, defaultUser } from "../../constants"
import {
  GetUserByUserIDSchema,
  PostNewUserSchema
} from "../../schemas/ts/users"

import { GetUserIdBody, PostNewUser } from "../../schemas/users"
dotenv.config()

const { CONNECT_DB } = process.env
const mongoClient = new MongoClient(CONNECT_DB)

const users: Collection = mongoClient.db(usersDB).collection(usersDB)
users.createIndex({ id: "text" })

interface IUsersRouteOpts {
  debugLogs: boolean
}

const usersRoute: FastifyPluginCallback<IUsersRouteOpts> = (
  server,
  options,
  done
) => {
  server.post<{ Body: GetUserByUserIDSchema }>(
    "/id",
    { schema: { body: GetUserIdBody } },
    async (request, reply) => {
      const { userId } = request.body
      const currentUser = await users.find({ id: userId }).toArray()

      options.debugLogs && console.log(`Requested ID: ${userId}\n\nOutput:\n`)
      logAndReply(reply, currentUser, options.debugLogs)
    }
  )
  server.post<{ Body: PostNewUserSchema }>(
    "/",
    { schema: { body: PostNewUser } },
    async (request, reply) => {
      const { name, password, userId, isAdmin, withPermissions } = request.body
      const newUser = {
        id: userId,
        password,
        name,
        isAdmin,
        withPermissions
      }
      users.insertOne(newUser)
      logAndReply(reply, newUser, options.debugLogs)
    }
  )
  done()
}

export default usersRoute
