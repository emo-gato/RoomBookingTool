import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import GroupComponent from "../components/GroupComponent";
import PropertyCardBig from "../components/PropertyCardBig";
import axios from 'axios';

const center = { lat: 45.7489, lng: 21.2087 };
const MAX_CARDS = 5;

const AuditoriumRental = ({ onAddEvent }) => {
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [markers, setMarkers] = useState(JSON.parse(localStorage.getItem('markers')) || []);
  const [markerInstances, setMarkerInstances] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ lat: 0, lng: 0, name: '', description: '', location: '', participants: '', dateTime: '', eventType: '' });

  const handleMapClick = (e) => {
    setNewEvent({ lat: e.latLng.lat(), lng: e.latLng.lng(), name: '', description: '' });
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3000/event', newEvent);
      let updatedMarkers = [...markers, { ...newEvent }];

      if (updatedMarkers.length > MAX_CARDS) {
        updatedMarkers.shift();
      }

      setMarkers(updatedMarkers);
      localStorage.setItem('markers', JSON.stringify(updatedMarkers));

      onAddEvent(newEvent);

      setOpenModal(false);
    } catch (error) {
      console.error('Error saving event details:', error);
      // Handle error here, e.g., show an error message to the user
    }
  };
  const createMarker = (latLng, map, title = '', description = '') => {
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      title,
      icon: {
        url: '/marker.png',
        scaledSize: new google.maps.Size(30, 30),
      },
    });

    const infoWindowContent = `<div>
      <strong>${title}</strong>
      <button style="float:right; border:none; background:transparent; cursor:pointer;" id="closeMarker">X</button><br/>
      ${description}
    </div>`;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    infoWindow.addListener('domready', () => {
      document.getElementById('closeMarker').onclick = () => {
        marker.setMap(null);
        const updatedMarkers = markers.filter(
          (m) => m.lat !== latLng.lat() || m.lng !== latLng.lng()
        );
        setMarkers(updatedMarkers);
        localStorage.setItem('markers', JSON.stringify(updatedMarkers));
      };
    });

    setMarkerInstances((prev) => [...prev, marker]);

    return marker;
  };

  const showOnlyOneMarker = (latLng) => {
    markerInstances.forEach((marker) => {
      marker.setMap(null);
    });

    const targetMarker = markerInstances.find(
      (marker) => 
        marker.getPosition().lat() === latLng.lat() && 
        marker.getPosition().lng() === latLng.lng()
    );

    if (targetMarker) {
      targetMarker.setMap(mapRef.current.mapInstance);
    }
  };

  const handleInvitation = (markerInfo) => {
    const { name, description } = markerInfo;
    const personalizedMessage = `Hi,

You are invited to an event at ${name}. The event details are as follows:

${description}

Looking forward to seeing you!`;

    alert(personalizedMessage); 
  };

  useEffect(() => {
    const loadGoogleMapsScript = (callback) => {
      const existingScript = document.getElementById('googleMaps');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6XT0u6vGdvQ2lN1ICHh39IWVAo_Pb5vY';
        script.id = 'googleMaps';
        document.body.appendChild(script);
        script.onload = () => {
          if (callback) callback();
        };
      } else {
        callback();
      }
    };

    loadGoogleMapsScript(() => setScriptLoaded(true));
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        mapTypeControl: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [{ saturation: -20 }, { hue: "#F9C8D1" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ hue: "#F9C8D1" }, { saturation: -20 }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ hue: "#F9C8D1" }, { saturation: -20 }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ hue: "#F9C8D1" }, { saturation: -20 }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ hue: "#F9C8D1" }, { saturation: -20 }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ hue: "#F9C8D1" }, { saturation: -20 }],
          },
        ],
      });

      map.addListener('click', handleMapClick);

      markers.forEach((markerInfo) => {
        createMarker(
          new google.maps.LatLng(markerInfo.lat, markerInfo.lng),
          map,
          markerInfo.name,
          markerInfo.description
        );
      });

      mapRef.current.mapInstance = map;
    }
  }, [scriptLoaded, markers]);

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <GroupComponent />
      <div ref={mapRef} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} />

      {/* Property cards on the left side */}
      <div
        style={{
          position: 'absolute',
          left: '10px',
          top: '25%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px', 
          zIndex: 1000,
        }}
      >
        {}
        <PropertyCardBig
          rectangle12="/rectangle-12@2x.png"
          driverName="West University of Timisoara"
          text="50"
          propHeight="300px"
          onSendInvitation={handleInvitation}
          onClick={() => {
            const targetLatLng = new google.maps.LatLng(45.7489, 21.2087); 
            showOnlyOneMarker(targetLatLng);
          }}
        />
        <PropertyCardBig
          rectangle12="/rectangle-121@2x.png"
          driverName="Politehnica Timisoara"
          text="Can host 50 students"
          propHeight="300px"
          onSendInvitation={handleInvitation}
          onClick={() => {
            const targetLatLng = new google.maps.LatLng(45.7499, 21.2097); 
            showOnlyOneMarker(targetLatLng);
          }}
        />

        {}
        {markers.map((markerInfo, index) => (
          <PropertyCardBig
            key={index}
            rectangle12="/image-2@2x.png"
            driverName={markerInfo.name}
            text={markerInfo.description}
            propHeight="300px"
            onSendInvitation={handleInvitation} 
            onClick={() => {
              const targetLatLng = new google.maps.LatLng(markerInfo.lat, markerInfo.lng);
              showOnlyOneMarker(targetLatLng);
            }}
          />
        ))}
      </div>

      <Dialog open={openModal} onClose={handleClose}>
  <DialogTitle>Add Event</DialogTitle>
  <DialogContent>
    <TextField
      label="Event Name"
      fullWidth
      value={newEvent.name}
      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
      sx={{ marginBottom: '16px' }} // Add spacing between text fields
    />
    <TextField
      label="Description"
      fullWidth
      multiline
      value={newEvent.description}
      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
      sx={{ marginBottom: '16px' }} // Add spacing between text fields
    />
    <TextField
      label="Location (Institution Name)"
      fullWidth
      value={newEvent.location}
      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
      sx={{ marginBottom: '16px' }} // Add spacing between text fields
    />
    <TextField
      label="Participants"
      fullWidth
      value={newEvent.participants}
      onChange={(e) => setNewEvent({ ...newEvent, participants: e.target.value })}
      sx={{ marginBottom: '16px' }} // Add spacing between text fields
    />
    <TextField
      label="Date and Time"
      fullWidth
      value={newEvent.dateTime}
      onChange={(e) => setNewEvent({ ...newEvent, dateTime: e.target.value })}
      sx={{ marginBottom: '16px' }} 
    />
    <TextField
      label="Type of Event"
      fullWidth
      value={newEvent.eventType}
      onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
      sx={{ marginBottom: '16px' }} 
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleSave} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>


    </div>
  );
};

export default AuditoriumRental;
