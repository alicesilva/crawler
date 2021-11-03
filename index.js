require("dotenv").config()
const App = require("./src/app");

async function main(){
  const results = await App.run()
  console.log(results.products)
}

main()