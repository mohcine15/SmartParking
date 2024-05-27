package com.example.parking.Model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Place {

    @Id
    private String nomPlace;
    private int nbrParking;
    private String imageUrl;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Parking> parkings;

    // Getters et Setters
    public String getNomPlace() {
        return nomPlace;
    }

    public void setNomPlace(String nomPlace) {
        this.nomPlace = nomPlace;
    }

    public int getNbrParking() {
        return nbrParking;
    }

    public void setNbrParking(int nbrParking) {
        this.nbrParking = nbrParking;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Parking> getParkings() {
        return parkings;
    }

    public void setParkings(List<Parking> parkings) {
        this.parkings = parkings;
    }
}