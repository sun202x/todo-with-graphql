import { gqlContext } from "..";

const Subscription = {
    todoAdded: {
        subscribe: (parent: any, args: any, { pubsub }: gqlContext) => {
            return pubsub.asyncIterator(['todo-added']);
        }
    }
};

export default Subscription;