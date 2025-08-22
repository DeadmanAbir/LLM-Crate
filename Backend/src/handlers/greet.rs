use actix_web::{HttpResponse, get};

#[get("/greet")]
pub async fn greet() -> HttpResponse {
    // let name = path.into_inner();
    HttpResponse::Ok().body(format!("Hello, Abir"))
}
