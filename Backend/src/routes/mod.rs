use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.configure(greet::init);
    cfg.configure(post_greet::init);
}

mod greet;

mod post_greet;
