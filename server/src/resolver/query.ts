import { ObjectId } from "mongodb";
import { gqlContext } from "..";

const Query = {
    callMe: () => {
        return "hi! it's me, graphQL";
    },

    todo: async (parent: any, args: { id: string }, { db }: gqlContext) => {
        return await db.collection('todos')
            .findOne({ _id: new ObjectId(args.id) });
    },

    allTodos: async (parent: any, args: never, { db }: gqlContext) => {
        return await db.collection('todos').find().toArray();
    }
};

export default Query;