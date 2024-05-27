package com.example.parking.Controller;

import com.example.parking.Model.Parking;
import com.example.parking.Service.ParkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/parkings")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingController {

    private static final Logger logger = Logger.getLogger(ParkingController.class.getName());

    @Autowired
    private ParkingService parkingService;

    @GetMapping("/place/{nomPlace}")
    public List<Parking> getParkingByNomPlace(@PathVariable String nomPlace) {
        List<Parking> parkings = parkingService.getParkingsByNomPlace(nomPlace);
        logger.info("Fetched " + parkings.size() + " parkings for place: " + nomPlace);
        return parkings;
    }
}