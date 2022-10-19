import { ObjectId } from "mongodb";

export type Todo = {
    id?: ObjectId;
    title: string;
    contents: string;
}

const Type = {
    Todo: {
        id: (parent: Todo) => parent.id || (parent as any)._id,
    }
};

export default Type;