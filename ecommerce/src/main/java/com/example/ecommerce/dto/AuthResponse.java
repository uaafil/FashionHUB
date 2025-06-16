package com.example.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Set;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private Set<String> roles;

    public AuthResponse(String token) {
    }
}
