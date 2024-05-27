package com.example.parking.Controller;

import com.example.parking.dto.LoginRequest;
import com.example.parking.dto.SignupRequest;
import com.example.parking.Model.Clients;
import com.example.parking.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        Clients client = new Clients();
        client.setNom(signupRequest.getNom());
        client.setEmail(signupRequest.getEmail());
        client.setPassword(signupRequest.getPassword());

        clientService.registerClient(client);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<Clients> client = clientService.findByEmail(loginRequest.getEmail());
        if (client.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), client.get().getPassword())) {
            // Generate JWT token (this step is simplified)
            return ResponseEntity.ok("User authenticated successfully");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}