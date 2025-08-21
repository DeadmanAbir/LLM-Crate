use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.configure(greet::init);

}

mod greet;

