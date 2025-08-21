use crate::handlers::post_greet;
use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(post_greet::post_greet);
}
