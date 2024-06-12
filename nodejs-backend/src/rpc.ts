import axios from "axios";

interface Todo {
    id: String;
    title: String;
    description: String;
    completed: boolean;
}

export async function getTodo():Promise<Todo[]> {
    const response = await axios.get("https://sum-server.100xdevs.com/todos");
    let todos = response.data.todos;
    return todos;
}