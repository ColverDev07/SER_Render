package com.example.demo;

import com.example.demo.dto.GenerationRequest;
import com.example.demo.service.ImageGenerationService;
import org.slf4j.Logger; // Importa
import org.slf4j.LoggerFactory; // Importa
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GenerationController {

    // 👇 Añade el Logger 👇
    private static final Logger log = LoggerFactory.getLogger(GenerationController.class);

    @Autowired
    private ImageGenerationService imageService;

    @PostMapping("/generate-image")
    public ResponseEntity<?> createImage(@RequestBody GenerationRequest request) {
        log.info("Recibida petición POST en /api/generate-image"); // Log al recibir
        try {
            String imageUrl = imageService.generateImageFromPrompt(request.getPrompt());
            if (imageUrl != null) {
                log.info("Imagen generada, devolviendo URL."); // Log de éxito
                return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
            } else {
                log.error("El servicio no pudo generar la imagen."); // Log de fallo
                return ResponseEntity.status(500).body(Map.of("error", "No se pudo generar la imagen."));
            }
        } catch (Exception e) {
            // 👇 Log del error en el controlador 👇
            log.error("Error inesperado en GenerationController: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Error interno del servidor al procesar la imagen."));
        }
    }
}