package com.example.parking.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Parking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParking;
    private String nomParking;
    private int nombreTotal;
    private int nombreLibre;

    @ManyToOne
    @JoinColumn(name = "nom_place")
    @JsonIgnore
    private Place place;

    @OneToMany(mappedBy = "parking")
    private Set<Reservation> reservations;

    // Getters and Setters
    public Long getIdParking() {
        return idParking;
    }

    public void setIdParking(Long idParking) {
        this.idParking = idParking;
    }

    public String getNomParking() {
        return nomParking;
    }

    public void setNomParking(String nomParking) {
        this.nomParking = nomParking;
    }

    public int getNombreTotal() {
        return nombreTotal;
    }

    public void setNombreTotal(int nombreTotal) {
        this.nombreTotal = nombreTotal;
    }

    public int getNombreLibre() {
        return nombreLibre;
    }

    public void setNombreLibre(int nombreLibre) {
        this.nombreLibre = nombreLibre;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }
}