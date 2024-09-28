import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS for proper map rendering

const Map = () => {
  // Set up the default map view (center and zoom level)
//   const position = [51.505, -0.09]; // Latitude and longitude (London in this example)
  const position = [31.4218, 75.6171]; // Latitude and longitude (DAV in this example)

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: '600px', width: '100%', borderRadius: '30px' }} // Set map size
      scrollWheelZoom={false}
    >
      {/* TileLayer loads the map from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Adding a marker with a popup */}
      <Marker position={position}>
        <Popup>
          A simple marker in DAV University.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
