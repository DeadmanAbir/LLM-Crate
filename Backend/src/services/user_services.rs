#[derive(Debug, Clone, serde::Serialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
}

pub async fn fetch_all() -> Vec<User> {
    vec![
        User {
            id: 1,
            name: "Alice".into(),
            email: "alice@example.com".into(),
        },
        User {
            id: 2,
            name: "Bob".into(),
            email: "bob@example.com".into(),
        },
    ]
}

pub async fn fetch_by_id(id: i32) -> Option<User> {
    Some(User {
        id,
        name: format!("User{}", id),
        email: format!("user{}@example.com", id),
    })
}
