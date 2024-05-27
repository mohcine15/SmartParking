package com.example.parking.Service;

import com.example.parking.Model.Parking;
import com.example.parking.Repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ParkingService {

    private static final Logger logger = Logger.getLogger(ParkingService.class.getName());

    @Autowired
    private ParkingRepository parkingRepository;

    public List<Parking> getParkingsByNomPlace(String nomPlace) {
        List<Parking> parkings = parkingRepository.findByPlaceNomPlace(nomPlace);
        logger.info("Fetched " + parkings.size() + " parkings for place: " + nomPlace);
        return parkings;
    }
}