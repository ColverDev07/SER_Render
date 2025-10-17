package com.example.demo.service;

import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
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

    @Value("${external.api.url}")
    private String apiUrl;

    // La autenticación sigue siendo la misma. Usamos un scope general.
    private String getAccessToken() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/cloud-platform"));
        AccessToken accessToken = credentials.refreshAccessToken();
        return accessToken.getTokenValue();
    }

    // Una única función que pide y recibe la imagen
    public String generateImageFromPrompt(String userPrompt) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        String accessToken = getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/json");

        // El formato del cuerpo para Imagen 2 es diferente
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
            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, Map.class);

            // La API devuelve la imagen como un texto largo (Base64)
            // Necesitamos extraerlo de la respuesta
            if (response.getBody() != null && response.getBody().containsKey("predictions")) {
                List<Map<String, String>> predictions = (List<Map<String, String>>) response.getBody().get("predictions");
                if (!predictions.isEmpty() && predictions.get(0).containsKey("bytesBase64Encoded")) {
                    String base64Image = predictions.get(0).get("bytesBase64Encoded");
                    // Devolvemos la imagen en un formato que el HTML puede mostrar directamente
                    return "data:image/png;base64," + base64Image;
                }
            }
            return null;

        } catch (Exception e) {
            System.err.println("Error llamando a la API de Imagen: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
