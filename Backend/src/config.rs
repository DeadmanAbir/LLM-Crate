use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct Config {
    pub host: String,
    pub port: u16,
}

pub fn get_config() -> Config {
    dotenvy::dotenv().ok();
    Config {
        host: std::env::var("HOST").unwrap_or("0.0.0.0".into()),
        port: std::env::var("PORT")
            .unwrap_or("8000".into())
            .parse()
            .unwrap(),
    }
}
