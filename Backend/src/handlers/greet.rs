use actix_web::{get, post, HttpResponse};

#[get("/greet")]
pub async fn greet() -> HttpResponse {
    // let name = path.into_inner();
    HttpResponse::Ok().body(format!("Hello, Abir"))
}
