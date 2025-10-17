package com.example.demo.controller;

import com.example.demo.dto.GenerationRequest;
import com.example.demo.service.ImageGenerationService; // <-- Cambiado
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GenerationController {

    @Autowired
    private ImageGenerationService imageService; // <-- Cambiado

    // Un único endpoint que devuelve la URL de la imagen directamente
    @PostMapping("/generate-image") // <-- Cambiado
    public ResponseEntity<?> createImage(@RequestBody GenerationRequest request) {
        try {
            String imageUrl = imageService.generateImageFromPrompt(request.getPrompt());
            if (imageUrl != null) {
                return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
            } else {
                return ResponseEntity.status(500).body(Map.of("error", "No se pudo generar la imagen."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}