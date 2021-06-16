import mongoose from 'mongoose';
const Schema = mongoose.Schema; //Alias for Mongoose Schema

const ClothingSchema = new Schema
({
    name: String,
    brand: String, 
    category: String,
    colour: String,
    size: String,
    price: Number
},
{
    collection: "contact-list"
});

const Model = mongoose.model("Contact", ClothingSchema);
export default Model;