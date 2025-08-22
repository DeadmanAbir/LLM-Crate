use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.configure(greet::init);
    cfg.configure(call::init);
}

mod greet;


mod call;
