import { FastifyReply } from "fastify"
import { Collection } from "mongodb"
import { Tag } from "../types"

type LogAdditions = {
  prefix?: string
  suffix?: string
}

/**
Logs the specified {value} to the console IF {debugLogs} = true (default= false)  
Either way- replies the value to the relevant route
 @param reply FastifyReply
 @param value any
 @param debugLogs boolean - optional (default= false)
 @param additions LogAdditions - optional
*/
export const logAndReply = (
  reply: FastifyReply,
  value: any,
  debugLogs: boolean = false,
  additions?: LogAdditions
) => {
  debugLogs &&
    console.log(
      `${additions?.prefix ? additions?.prefix : ""}`,
      value,
      `${additions?.suffix ? additions?.suffix : ""}`
    )
  reply.send({ value })
}
/**
* retrieves all documents with a tag that is in 'tags' array,  
* OPTIONAL - logs each tag. 
** queryAddition: adds functionality to the tag search,  
* i.e: { someKey: { $regex: wantedKey, $options: "i" } }

*  @param dumpster Collection
*  @param tags Tag[]
*  @param queryAddition any
*  @param debugLogs boolean - optional (default= false)
*/
export const checkAllTags = async (
  dumpster: Collection,
  tags: Tag[],
  queryAddition?: any,
  debugLogs: boolean = false
) => {
  const allTagItems: any = []

  for (const tag of tags) {
    debugLogs && console.log("Wanted Tag: ", tag)
    const items = await dumpster.find({ tags: tag, ...queryAddition }).toArray()
    console.log(items)
    allTagItems.push(...items)
  }

  return allTagItems
}
