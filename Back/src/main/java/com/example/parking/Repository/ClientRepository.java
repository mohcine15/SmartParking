package com.example.parking.Repository;

import com.example.parking.Model.Clients;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Clients, Long> {
    Optional<Clients> findByEmail(String email);
}