use actix_web::{App, HttpServer};
mod handlers;
mod routes;
mod services;
mod config;
use env_logger::Env;
use actix_web::middleware::Logger;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    let config = config::get_config();
    env_logger::init_from_env(Env::default().default_filter_or("info"));
  
    
    println!(
        "🚀 Server running at http://{}:{}",
        config.host, config.port
    );

    HttpServer::new(move || App::new().wrap(Logger::default()).wrap(Logger::new("%a %{User-Agent}i")).configure(routes::init))
        .bind((config.host.as_str(), config.port))?
        .run()
        .await
}
