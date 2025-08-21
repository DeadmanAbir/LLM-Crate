use crate::handlers::greet;
use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(greet::greet);
}
