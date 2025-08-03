package com.simplelogin.dto;

public class UserDTO {
    private String username;
    private String email;

    public UserDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getters and setters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
}