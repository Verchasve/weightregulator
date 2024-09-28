// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// The greet function to handle invocations
#[tauri::command] // This macro makes the function callable from the frontend
fn greet(name: String) -> String {
    format!("Hello, {}!", name) // Returns a greeting message with the name passed from the frontend
}

