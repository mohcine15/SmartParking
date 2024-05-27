package com.example.parking.Controller;

import com.example.parking.Model.Place;
import com.example.parking.Service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    @GetMapping("/{nomPlace}")
    public Place getPlaceByNomPlace(@PathVariable String nomPlace) {
        return placeService.getPlaceByNomPlace(nomPlace);
    }
}