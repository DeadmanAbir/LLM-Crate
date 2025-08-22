use crate::services::call::call_multiple_models;
use actix_web::{Error, HttpResponse, post, web};
use serde_json::json;
use tracing::error;
#[derive(serde::Deserialize)]
pub struct CallRequest {
    pub models: Vec<String>,
}

#[post("/call")]
pub async fn call(req: web::Json<CallRequest>) -> Result<HttpResponse, Error> {
    match call_multiple_models().await {
        Ok(content) => Ok(HttpResponse::Ok().json(json!({
            "success": true,
            "data": content
        }))),
        Err(err) => {
            error!(
                error = %err,
                request_models = ?req.models,
                "Failed to call AI models"
            );
            Err(actix_web::error::ErrorInternalServerError(json!({
                "success": false,
                "message": "Failed to process request"
            })))
        }
    }
}
