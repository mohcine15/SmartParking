package com.example.parking.Repository;

import com.example.parking.Model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Méthode pour rechercher les réservations qui chevauchent les dates d'une nouvelle réservation
    @Query("SELECT r FROM Reservation r WHERE r.parking.idParking = :parkingId " +
            "AND ((r.entryDate BETWEEN :entryDate AND :exitDate) OR " +
            "(r.exitDate BETWEEN :entryDate AND :exitDate) OR " +
            "(:entryDate BETWEEN r.entryDate AND r.exitDate) OR " +
            "(:exitDate BETWEEN r.entryDate AND r.exitDate))")
    List<Reservation> findOverlappingReservations(@Param("parkingId") Long parkingId,
                                                  @Param("entryDate") Date entryDate,
                                                  @Param("exitDate") Date exitDate);
}
