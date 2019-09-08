import { Add } from "./queries/add/add";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDbManager } from "./managers/dynamodbManager";
import { Reflector } from "./reflector";
import { NodenamoError } from "./errors/nodenamoError";
import { Get } from "./queries/get/get";
import { Find } from "./queries/find/find";
import { Delete } from "./queries/delete/delete";

export class NodeNamo
{
    constructor(private client:DocumentClient)
    {

    }

    add(obj:object): Add
    {
        if(!Reflector.getIdKey(obj))
        {
            throw new NodenamoError(`Could not add an object because it has no ID property. Try adding @DBColumn({id:true}) to one of its property to represent a unique object ID.`)
        }

        return new Add(new DynamoDbManager(this.client), obj);
    }

    get(id:string|number): Get
    {
        return new Get(new DynamoDbManager(this.client), id);
    }

    find(): Find
    {
        return new Find(new DynamoDbManager(this.client));
    }

    delete(id:string|number): Delete
    {
        return new Delete(new DynamoDbManager(this.client), id);
    }
};