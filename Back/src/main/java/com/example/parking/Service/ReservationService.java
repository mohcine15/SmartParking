package com.example.parking.Service;

import com.example.parking.Model.Parking;
import com.example.parking.Model.Reservation;
import com.example.parking.Repository.ParkingRepository;
import com.example.parking.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ParkingRepository parkingRepository;

    public Reservation saveReservation(Reservation reservation) throws Exception {
        Parking parking = parkingRepository.findById(reservation.getParking().getIdParking())
                .orElseThrow(() -> new Exception("Parking not found"));

        // Check if there are free spaces available
        if (parking.getNombreLibre() <= 0) {
            throw new Exception("No free spaces available");
        }

        // Check for existing reservations that overlap with the new reservation
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservation.getParking().getIdParking(),
                reservation.getEntryDate(),
                reservation.getExitDate());

        if (!overlappingReservations.isEmpty()) {
            throw new Exception("Overlapping reservations found");
        }

        // Decrease free spaces by 1
        parking.setNombreLibre(parking.getNombreLibre() - 1);
        // Save the updated parking entity
        parkingRepository.save(parking);

        reservation.setParking(parking);
        return reservationRepository.save(reservation);
    }

}
