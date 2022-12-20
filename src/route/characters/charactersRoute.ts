import dotenv from "dotenv"
import { ObjectId, MongoClient, Collection } from "mongodb"
import { FastifyPluginCallback } from "fastify"
import { logAndReply } from "../../utils"
import { usersDB, charactersDB } from "../../constants"
import { CreateCharacterBodySchema } from "../../schemas/ts/characters"
import {
  Archer,
  Character,
  Healer,
  Magician,
  Warrior
} from "../../types/Character"

dotenv.config()

const { CONNECT_DB } = process.env
const mongoClient = new MongoClient(CONNECT_DB)

const characters: Collection = mongoClient
  .db(charactersDB)
  .collection(charactersDB)
const users: Collection = mongoClient.db(usersDB).collection(usersDB)

interface ICharacterRouteOpts {
  debugLogs: boolean
}

const characterRoute: FastifyPluginCallback<ICharacterRouteOpts> = (
  server,
  options,
  done
) => {
  server.get("/", async (request, reply) => {
    logAndReply(reply, "Character's route")
  })

  server.post<{ Body: CreateCharacterBodySchema }>(
    "/character",
    async (request, reply) => {
      const {
        userId,
        characterClass,
        name,
        mainAttribute,
        secondaryAttribute
      } = request.body

      const user = await users
        .find({ id: { $regex: userId, $options: "i" } })
        .toArray()

      options.debugLogs && console.log(`Requested ID: ${userId}\n\nOutput:\n`)

      let newCharacter = new Character("temp", 5, 5, 5, 5)

      switch (characterClass) {
        case "archer":
          newCharacter = new Archer(name, mainAttribute, secondaryAttribute)
          break
        case "warrior":
          newCharacter = new Warrior(name, mainAttribute, secondaryAttribute)
          break
        case "healer":
          newCharacter = new Healer(name, mainAttribute, secondaryAttribute)
          break
        case "magician":
          newCharacter = new Magician(name, mainAttribute, secondaryAttribute)
          break
      }

      characters.insertOne(newCharacter)

      const newCharacterDB = await characters.findOne({ id: newCharacter.id })

      // options.debugLogs && console.log("PREV:\n")
      // users.updateOne({ id: { $regex: userId, $options: "i" } }, {$set: })

      logAndReply(reply, newCharacter, options.debugLogs)
      const updatedUser = {
        characters: []
      }
    }
  )
  done()
}

export default characterRoute
