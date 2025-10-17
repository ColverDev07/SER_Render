package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HolaController {

    @GetMapping("/")
    public String index() {
        return "index"; // busca el archivo en src/main/resources/templates/index.html
    }
}
