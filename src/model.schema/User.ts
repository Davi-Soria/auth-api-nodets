import { Schema, model,  Model, connection } from 'mongoose';

type userType = {
    name: string,
    email: string,
    password: string,
    age: number,
    avatar: string
}

const schema = new Schema<userType>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    avatar: { type: String }
})

const modelName: string = "contact";

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<userType>
    :
    model<userType>(modelName, schema, "contact")

