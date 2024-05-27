import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [parkings, setParkings] = useState([]);
  const [error, setError] = useState(null);
  const [entryDate, setEntryDate] = useState({});
  const [exitDate, setExitDate] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/places')
      .then(response => {
        console.log('Réponse API pour les places:', response.data);
        // Vérifiez la structure des données avant de les utiliser
        if (Array.isArray(response.data)) {
          const placesData = response.data.map(place => ({
            ...place,
            parkings: place.parkings || [] // Assurez-vous que chaque place a un tableau de parkings
          }));
          setPlaces(placesData);
        } else {
          console.error('Format de réponse inattendu:', response.data);
          setError('Format de réponse inattendu');
        }
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des places!', error);
        setError('Il y a eu une erreur lors de la récupération des places');
      });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const refreshParkings = (nomPlace) => {
    axios.get(`http://localhost:8080/api/parkings/place/${nomPlace}`)
      .then(response => {
        console.log('Réponse API pour les parkings:', response.data);
        if (Array.isArray(response.data)) {
          setParkings(response.data);
        } else {
          console.error('Format de réponse inattendu:', response.data);
          setError('Format de réponse inattendu');
        }
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des parkings!', error);
        setError('Il y a eu une erreur lors de la récupération des parkings');
      });
  };

  const handleChoose = (place) => {
    if (place && Array.isArray(place.parkings)) {
      setSelectedPlace(place);
      const parkingsForPlace = place.parkings.map(parking => ({
        ...parking,
        place: place.nomPlace
      }));
      setParkings(parkingsForPlace);
      
      // Vérifier si les parkings pour cette place sont déjà chargés
      if (parkingsForPlace.length === 0) {
        // Appel de la fonction refreshParkings seulement si les parkings ne sont pas déjà chargés
        refreshParkings(place.nomPlace); 
      }
    } else {
      console.error('Format de données inattendu pour les parkings:', place);
      setError('Format de données inattendu pour les parkings');
    }
  };
  

  const handleBack = () => {
    setSelectedPlace(null);
    setEntryDate({});
    setExitDate({});
    setParkings([]);
  };

  const handleEntryDateChange = (id, date) => {
    setEntryDate(prevState => ({ ...prevState, [id]: date }));
  };

  const handleExitDateChange = (id, date) => {
    setExitDate(prevState => ({ ...prevState, [id]: date }));
  };

  const calculateBilling = (entryDate, exitDate) => {
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);
    const diffMinutes = Math.round((exit - entry) / 60000);
    const cost = Math.ceil(diffMinutes / 5) * 2;
    return cost;
  };

  const handleReserve = (parkingId) => {
    const entry = entryDate[parkingId];
    const exit = exitDate[parkingId];

    if (!entry || !exit) {
      alert('Veuillez sélectionner les dates d\'entrée et de sortie.');
      return;
    }

    const reservationDetails = {
      parking: { idParking: parkingId },
      entryDate: new Date(entry),
      exitDate: new Date(exit),
      billing: calculateBilling(entry, exit)
    };

    axios.post('http://localhost:8080/api/reservations', reservationDetails)
      .then(response => {
        console.log('Réservation réussie:', response.data);
        alert('Réservation réussie!');
        setParkings(prevState => prevState.map(parking => {
          if (parking.idParking === parkingId) {
            return { ...parking, nombreLibre: parking.nombreLibre - 1 };
          }
          return parking;
        }));
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la création de la réservation:', error);
        alert('Il y a eu une erreur lors de la création de la réservation.');
      });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="Places">
      <h1>Nos Parkings</h1>
      {selectedPlace ? (
        <div>
          <button onClick={handleBack} className="back-button">Retour</button>
          <h2>Parkings pour {selectedPlace.nomPlace}</h2>
          <div className="parking-cards-container">
            {parkings.length > 0 ? (
              parkings.map(parking => (
                <div key={parking.idParking} className="parking-card">
                  <h3>{parking.nomParking}</h3>
                  <p>Places Totales: {parking.nombreTotal}</p>
                  <p>Places Libres: {parking.nombreLibre}</p>
                  <div className="date-inputs">
                    <label>Date d'Entrée: </label>
                    <input
                      type="datetime-local"
                      value={entryDate[parking.idParking] || ''}
                      onChange={(e) => handleEntryDateChange(parking.idParking, e.target.value)}
                    />
                    <label>Date de Sortie: </label>
                    <input
                      type="datetime-local"
                      value={exitDate[parking.idParking] || ''}
                      onChange={(e) => handleExitDateChange(parking.idParking, e.target.value)}
                    />
                  </div>
                  {entryDate[parking.idParking] && exitDate[parking.idParking] && (
                    <>
                      <p>Date d'Entrée: {new Date(entryDate[parking.idParking]).toLocaleString()}</p>
                      <p>Date de Sortie: {new Date(exitDate[parking.idParking]).toLocaleString()}</p>
                      <p>Facturation: {calculateBilling(entryDate[parking.idParking], exitDate[parking.idParking])} DH</p>
                    </>
                  )}
                  <button onClick={() => handleReserve(parking.idParking)}>Réserver</button>
                </div>
              ))
            ) : (
              <p>Aucun parking disponible</p>
            )}
          </div>
        </div>
      ) : (
        <div className="card-container">
          {places.map(place => (
            <div key={place.nomPlace} className="card">
              <img src={place.imageUrl} alt={place.nomPlace} className="card-image"/>
              <div className="card-content">
                <h2>{place.nomPlace}</h2>
                <p>{place.nbrParking} parkings</p>
                <button onClick={() => handleChoose(place)}>Choisir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Places;
