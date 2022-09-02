import { FastifyReply } from "fastify"

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
  debugLogs: boolean,
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
