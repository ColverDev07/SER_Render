package com.example.demo.service;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import org.slf4j.Logger; // Importa el Logger
import org.slf4j.LoggerFactory; // Importa el LoggerFactory
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ImageGenerationService {

    // 👇 Añade el Logger 👇
    private static final Logger log = LoggerFactory.getLogger(ImageGenerationService.class);

    @Value("${external.api.url}")
    private String apiUrl;

    private String getAccessToken() throws IOException {
        log.info("Obteniendo token de acceso..."); // Log para saber que entra aquí
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/cloud-platform"));
        AccessToken accessToken = credentials.refreshAccessToken();
        log.info("Token de acceso obtenido exitosamente."); // Log de éxito
        return accessToken.getTokenValue();
    }

    public String generateImageFromPrompt(String userPrompt) throws IOException {
        log.info("Intentando generar imagen para el prompt: {}", userPrompt.substring(0, Math.min(userPrompt.length(), 100)) + "..."); // Muestra parte del prompt
        RestTemplate restTemplate = new RestTemplate();
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");

        String requestBody = String.format("""
            {
              "instances": [
                { "prompt": "%s" }
              ],
              "parameters": {
                "sampleCount": 1
              }
            }
            """, userPrompt.replace("\"", "\\\""));

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            log.info("Enviando petición a la API de Imagen: {}", apiUrl);
            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, Map.class);
            log.info("Respuesta recibida de la API.");

            if (response.getBody() != null && response.getBody().containsKey("predictions")) {
                List<Map<String, String>> predictions = (List<Map<String, String>>) response.getBody().get("predictions");
                if (!predictions.isEmpty() && predictions.get(0).containsKey("bytesBase64Encoded")) {
                    String base64Image = predictions.get(0).get("bytesBase64Encoded");
                    log.info("Imagen generada y decodificada exitosamente.");
                    return "data:image/png;base64," + base64Image;
                }
            }
            log.warn("La respuesta de la API no contenía la imagen esperada. Respuesta: {}", response.getBody());
            return null;

        } catch (Exception e) {
            // 👇 Usa el logger para imprimir el error 👇
            log.error("Error llamando a la API de Imagen: {}", e.getMessage(), e); // Imprime mensaje y stack trace
            // Ya no lanzamos IOException, manejamos el error devolviendo null o relanzando una excepción específica si prefieres
            return null; // Devuelve null si hay error
        }
    }
}