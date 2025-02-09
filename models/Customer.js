// const mongoose = require("mongoose")
// const {Schema, model} = mongoose;

// const custSchema = new Schema({
//     name: String,
//     age: Number
// })

// const Customer = model("Customer", custSchema);

// module.exports = Customer;



const mongoose = require("mongoose")

const custSchema = new mongoose.Schema({
name: String,
age: Number,

})

const Customer = mongoose.model("Customer", custSchema)

module.exports = Customer;