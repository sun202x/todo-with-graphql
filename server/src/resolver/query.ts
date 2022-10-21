import { gqlContext } from "..";

const Query = {
    callMe: () => {
        return "hi! it's me, graphQL";
    },

    allTodos: async (parent: any, args: never, { db }: gqlContext) => {
        return await db.collection('todos').find().toArray();
    }
};

export default Query;