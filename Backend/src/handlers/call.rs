use crate::services::call::single_model_call;
use actix_web::{Error, HttpResponse, post, web};
use serde_json::json;
use tracing::error;
#[derive(serde::Deserialize)]
pub struct CallRequest {
    pub model: String,
    pub query: String,
}

#[post("/call")]
pub async fn call(req: web::Json<CallRequest>) -> Result<HttpResponse, Error> {
    let CallRequest { model, query } = req.into_inner();

    match single_model_call(model, query).await {
        Ok(content) => Ok(HttpResponse::Ok().json(json!({
            "success": true,
            "data": content
        }))),
        Err(err) => {
            error!(
                error = %err,
                "Failed to call AI models"
            );
            Err(actix_web::error::ErrorInternalServerError(json!({
                "success": false,
                "message": "Failed to process request"
            })))
        }
    }
}
