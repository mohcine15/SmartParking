package com.example.parking.Repository;

import com.example.parking.Model.Parking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ParkingRepository extends JpaRepository<Parking, Long> {
    List<Parking> findByPlaceNomPlace(String nomPlace);
}