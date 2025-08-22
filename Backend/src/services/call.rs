use openrouter_rs::{
    OpenRouterClient,
    api::chat::{ChatCompletionRequest, Message},
    types::Role,
};



pub async fn call_multiple_models() -> Result<String, String> {
    let api_key: String = std::env::var("OPENROUTER_API_KEY")
        .map_err(|e| format!("Openrouter API KEY required: {}", e))?;

    let client = OpenRouterClient::builder()
        .api_key(api_key)
        .build()
        .map_err(|e| format!("Failed to build client: {}", e))?;

    let request = ChatCompletionRequest::builder()
        .model("deepseek/deepseek-chat-v3.1")
        .messages(vec![
            Message::new(Role::System, "You are a helpful assistant"),
            Message::new(Role::User, "Explain Rust ownership in simple terms"),
        ])
        .temperature(0.7)
        .max_tokens(500)
        .build()
        .map_err(|e| format!("Failed to build request: {}", e))?;

    // Send request and get response
    let response = client.send_chat_completion(&request).await.map_err(|e| format!("Failed to send request: {}", e))?;
    if let Some(content) = response.choices[0].content() {
        Ok(content.to_string())
    } else {
        Err(String::from("No content found in response"))
    }
}