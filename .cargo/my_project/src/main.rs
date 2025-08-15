// src/main.rs

use std::env;
use std::process;

use my_project::greet;
use log::{info, error};
use env_logger;

fn main() {
    // Initialize logger
    env_logger::init();

    info!("Application starting...");

    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        error!("Missing required argument: <name>");
        eprintln!("Usage: {} <name>", args[0]);
        process::exit(1);
    }

    let name = &args[1];

    match greet(name) {
        Ok(message) => {
            println!("{}", message);
            info!("Greeting sent successfully");
        }
        Err(e) => {
            error!("Failed to greet: {}", e);
            process::exit(1);
        }
    }

    info!("Application finished successfully");
}

