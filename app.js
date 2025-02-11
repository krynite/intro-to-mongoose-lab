// Imports
const dotenv = require('dotenv').config();
// const morgan = require("morgan")
const mongoose = require('mongoose');
const Customer = require("./models/Customer")
const prompt = require('prompt-sync')();
const log = require("debug")("intro-to-mongoose-lab:app.js")

// Configs
mongoose.set("debug", true)
// app.use(morgan("dev"))

// Connections
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};
connect();

// Queries
const createCustomer = async () =>{
  const custName = prompt("What is the customers new name?")
  const custAge = prompt("What is the customers new age?")
  console.log(`Customers name is: ${custName}`)
  console.log(`Customers age is: ${custAge}`)

    const custData = {
      name: custName,
      age: custAge,
    }

    const customer = await Customer.create(custData);

    console.log("New Customer: ", customer.name)
    const next = prompt("Press any Enter to continue.")
}

const viewAllCustomer = async () =>{
  const customers = await Customer.find({})

  if(customers.length >= 1){
    console.log(`
      Below is a list of customers:`)
      customers.forEach((customer)=>{
        console.log(`
          Name: ${customer.name}
          Age: ${customer.age}
          ID: ${customer._id}
          `)
      })
  } else {
    return console.log(`No customers. `)
  }
  const next = prompt("Press any Enter to continue.")
}

const updateCustomer = async () => {
  await viewAllCustomer();
  const custId = prompt(`Copy and paste the id of the customer you would like to update here:`);
  const newCustName = prompt(`What is the customers new name?`);
  const newCustAge = prompt(`What is the customers new age?`);
  const updateCust = await Customer.findById(custId);

  updateCust.name = newCustName;
  updateCust.age = newCustAge;

  await updateCust.save()
  const next = prompt("Press any Enter to continue.")
}

const deleteCustomer = async () => {
  await viewAllCustomer();
  const custId = prompt(`Copy and paste the id of the customer you would like to delete here:`);
  const delCust = await Customer.findById(custId);
  const displayDelName = delCust.name
  await delCust.deleteOne();
  console.log(`Customer "${displayDelName}" has been deleted.`)
  const next = prompt("Press any Enter to continue.")
}

const runQueries = async () =>{
  let appStatus = true;

  while(appStatus){
    const start = prompt(`            
      What would you like to do?

      1. Create a customer
      2. View all customers
      3. Update a customer
      4. Delete a customer
      5. Quit

      Number of action to run:
      `)
      switch(start){
        case '5':
          appStatus = false;
          console.log(`Selected:  Quit`)
          console.log(`exiting...`)
          break;
        case '1':
          console.log(`Selected: Creating customer`)
          await createCustomer();
          break;
        case '2':
          console.log(`Selected: View all customers`)
          await viewAllCustomer();
          break;
        case '3':
          console.log(`Selected:  Update a customer`)
          await updateCustomer();
          break;
        case '4':
          console.log(`Selected: Delete a customer`)
          await deleteCustomer();
          break;
        default:
          console.log(`Please choose between 1-5.`)
          const next = prompt("Press any Enter to continue.")
          break;      
      }
  }
}