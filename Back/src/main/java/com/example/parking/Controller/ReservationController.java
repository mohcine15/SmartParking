package com.example.parking.Controller;

import com.example.parking.Model.Reservation;
import com.example.parking.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")

public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) throws Exception {
        return reservationService.saveReservation(reservation);
    }
}