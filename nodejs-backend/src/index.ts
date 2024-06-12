import { getTodo } from "./rpc";

async function getData(){
    const todos = await getTodo();
    console.log(todos);
}
getData();