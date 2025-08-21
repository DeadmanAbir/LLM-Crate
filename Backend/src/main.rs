use actix_web::{App, HttpServer};
mod handlers;
mod routes;
mod services;
mod config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    let config = config::get_config();

    println!(
        "🚀 Server running at http://{}:{}",
        config.host, config.port
    );

    HttpServer::new(move || App::new().configure(routes::init))
        .bind((config.host.as_str(), config.port))?
        .run()
        .await
}
