use actix_web::{post, web, HttpResponse};
use crate::services::call::call_multiple_models;
use serde_json::json;
#[derive(serde::Deserialize)]
pub struct CallRequest {
    pub models: Vec<String>,
}

#[post("/call")]
pub async fn call(req: web::Json<CallRequest>) -> HttpResponse {
    let models = &req.models;
    // let chat = call_multiple_models().await;
    match call_multiple_models().await {
        Ok(content) => {
            // Use the content string here
            HttpResponse::Ok().body(format!("{}",content))
   
        }
        Err(error) => {
            HttpResponse::InternalServerError()
            .content_type("application/json")
            .json(json!({
                "success": false,
                "error": error,
                "message": "Failed to call AI models"
            }))
        }
    }
 
}
