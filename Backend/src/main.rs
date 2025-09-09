use actix_cors::Cors;
use actix_web::{App, HttpServer};
mod config;
mod handlers;
mod routes;
mod services;
use actix_web::middleware::Logger;
use env_logger::Env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    let config = config::get_config();
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    println!(
        "🚀 Server running at http://{}:{}",
        config.host, config.port
    );

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .configure(routes::init)
    })
    .bind((config.host.as_str(), config.port))?
    .run()
    .await
}
