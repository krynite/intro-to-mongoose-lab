// imports
const dotenv = require('dotenv').config();
// const morgan = require("morgan")
const mongoose = require('mongoose');
mongoose.set("debug", true)


const Customer = require("./mondels/Customer")
const prompt = require('prompt-sync')();


const connect = async () => {
  

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  // await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});




const createCustomer = async () =>{
  const custName = prompt("What is the customers new name?")
  console.log(`Customers name is: ${custName}`)
  const custAge = prompt("What is the customers new age?")
  console.log(`Customers age is: ${custAge}`)

    const custData = {
      name: custName,
      age: custAge,
    }

    const customer = await Customer.create(custData);

    console.log("New Customer: ", customer)

}




// configs
const log = require("debug")("intro-to-mongoose-lab:app.js")

mongoose.connect(process.env.MONGODB_URI)
mongoose.set("debug", true)
mongoose.connection.on("connected", () => {
  log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// middleware
// app.use(morgan("dev"))




const runQueries = async () =>{

  let appStatus = true;

  while(appStatus){             // Note: only backticks work. Not normal single/double quotes!!!
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
          createCustomer();
          break;
        case '2':
          console.log(`Selected: View all customers`)
          break;
        case '3':
          console.log(`Selected:  Update a customer`)
          break;
        case '4':
          console.log(`Selected: Delete a customer`)
          break;
      }





  
  }

}










// const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);
