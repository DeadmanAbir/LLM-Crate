use actix_web::{post, web, HttpResponse};

#[derive(serde::Deserialize)]
pub struct GreetRequest {
    pub name: String,
}

#[post("/post_greet")]
pub async fn post_greet(req: web::Json<GreetRequest>) -> HttpResponse {
    let name = &req.name;
    HttpResponse::Ok().body(format!("Hello, your name is : {}", name))
}
