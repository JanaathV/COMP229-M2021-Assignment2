import mongoose from 'mongoose';
const Schema = mongoose.Schema; //Alias for Mongoose Schema

const ContactSchema = new Schema
({
    name: String,
    email: String, 
    phonenumber: String
    
},
{
    collection: "contact"
});

const Model = mongoose.model("Contact", ContactSchema);
export default Model;