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
    let first_model = req
        .models
        .get(0)
        .ok_or_else(|| actix_web::error::ErrorBadRequest("No models provided"))?;

    match call_multiple_models(first_model.clone()).await {
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
