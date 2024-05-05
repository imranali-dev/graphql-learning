import { GraphqlInit } from "./Graphqlinitsetup/main";
const PORT = 8080
async function init() {
  const app = await GraphqlInit();
  app.listen(PORT,()=>{
    return console.log(`Express is listening at http://localhost:${PORT}`);
  
  })}

init(); 
