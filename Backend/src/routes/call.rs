use crate::handlers::call;
use actix_web::web;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(call::call);
}
