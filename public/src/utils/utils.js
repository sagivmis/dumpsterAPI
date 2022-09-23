"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllTags = exports.logAndReply = void 0;
/**
Logs the specified {value} to the console IF {debugLogs} = true (default= false)
Either way- replies the value to the relevant route
 @param reply FastifyReply
 @param value any
 @param debugLogs boolean - optional (default= false)
 @param additions LogAdditions - optional
*/
const logAndReply = (reply, value, debugLogs, additions) => {
    debugLogs &&
        console.log(`${additions?.prefix ? additions?.prefix : ""}`, value, `${additions?.suffix ? additions?.suffix : ""}`);
    reply.send({ value });
};
exports.logAndReply = logAndReply;
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
const checkAllTags = async (dumpster, tags, queryAddition, debugLogs = false) => {
    const allTagItems = [];
    for (const tag of tags) {
        debugLogs && console.log("Wanted Tag: ", tag);
        const items = await dumpster.find({ tags: tag, ...queryAddition }).toArray();
        console.log(items);
        allTagItems.push(...items);
    }
    return allTagItems;
};
exports.checkAllTags = checkAllTags;
