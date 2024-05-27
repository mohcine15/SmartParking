package com.example.parking.Service;

import com.example.parking.Model.Place;
import com.example.parking.Repository.PlaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    public Place getPlaceByNomPlace(String nomPlace) {
        return placeRepository.findById(nomPlace).orElse(null);
    }
}