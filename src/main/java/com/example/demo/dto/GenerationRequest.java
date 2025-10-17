package com.example.demo.dto;

public class GenerationRequest {
    private String prompt;

    // Es importante tener los getters y setters para que Spring Boot pueda
    // convertir el JSON del frontend a este objeto automáticamente.
    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
