import mongoose from 'mongoose';
const Schema = mongoose.Schema; //Alias for Mongoose Schema

const ContactSchema = new Schema
({
    name: String,
    brand: String, 
    category: String,
    colour: String,
    size: String,
    price: Number
},
{
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;