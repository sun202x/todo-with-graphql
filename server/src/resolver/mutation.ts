import { ObjectId } from "mongodb";
import { gqlContext } from "..";
import { Todo } from "./type";

const Mutation = {

    addSomeTodo: async (parent: any, args: never, { db }: gqlContext) => {
        const todos = db.collection('todos');
        const count = await todos.estimatedDocumentCount();

        const sampleTodo: Todo = {
            title: `sample todo${count}`,
            contents: `This is a sample todo${count}`,
            priority: 1,
            done: false
        };
            
        const { insertedId } = await todos.insertOne(sampleTodo);
        sampleTodo.id = insertedId;

        return sampleTodo;
    },

    addTodo: async (parent: any, args: { input: Todo }, { db, pubsub }: gqlContext) => {
        const newTodo = { ... args.input };
        const { insertedId } = await db.collection('todos').insertOne(newTodo);

        newTodo.id = insertedId;

        pubsub.publish('todo-added', { todoAdded: newTodo });

        return newTodo;
    },

    replaceTodo: async (parent: any, args: { input: Todo }, { db }: gqlContext) => {
        const todos = db.collection('todos');
        const filter = { _id: new ObjectId(args.input.id) };

        await todos.replaceOne(filter, args.input, { upsert: true });

        return await todos.findOne(filter);
    },

    deleteTodo: async (parent: any, args: { id: string }, { db }: gqlContext) => {
        const todos = db.collection('todos');
        const filter = { _id: new ObjectId(args.id) };

        await todos.deleteOne(filter);

        return args.id;
    }

};

export default Mutation;