use reqwest::Error;

#[derive(Debug, serde_derive::Deserialize)]
struct Todo {
    id: u64,
    title: String,
    description: String,
    completed: bool,
}

#[derive(Debug, serde_derive::Deserialize)]
struct Response {
    todos: Vec<Todo>,
}

async fn get_todo() -> Result<Response, Error> {
    let response = reqwest::get("https://sum-server.100xdevs.com/todos").await?;
    let todos: Response = response.json().await?;
    Ok(todos)
}

#[tokio::main]

async fn main() {
    match get_todo().await {
        Ok(todos) => println!("{:?}", todos),
        Err(err) => println!("Error: {}",err),
    }
}