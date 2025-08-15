// src/lib.rs

use std::error::Error;

/// Greets a user by name
pub fn greet(name: &str) -> Result<String, Box<dyn Error>> {
    if name.trim().is_empty() {
        Err("Name cannot be empty".into())
    } else {
        Ok(format!("Welcome to my Rust project, {}!", name))
    }
}

/// Adds two numbers
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// Divides two numbers safely
pub fn divide(a: f64, b: f64) -> Result<f64, Box<dyn Error>> {
    if b == 0.0 {
        Err("Division by zero is not allowed".into())
    } else {
        Ok(a / b)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet() {
        assert_eq!(greet("Gonzalo").unwrap(), "Welcome to my Rust project, Gonzalo!");
        assert!(greet("").is_err());
    }

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn test_divide() {
        assert_eq!(divide(10.0, 2.0).unwrap(), 5.0);
        assert!(divide(1.0, 0.0).is_err());
    }
}
