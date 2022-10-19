import { gqlContext } from "..";

const Query = {
    getAllTodos: async (parent: any, args: never, { db }: gqlContext) => {
        return await db.collection('todos').find().toArray();
    }
};

export default Query;