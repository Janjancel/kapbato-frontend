
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix marker icon issue in Leaflet
// import L from "leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const customIcon = new L.Icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const MapComponent = () => {
//   const [heritageLocations, setHeritageLocations] = useState([]);

//   // Fetch data from Django API
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/heritage-houses/")
//       .then((response) => response.json())
//       .then((data) => {
//         setHeritageLocations(data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <MapContainer
//       center={heritageLocations.length ? heritageLocations[0].position : [13.9311, 121.6176]}
//       zoom={10}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; OpenStreetMap contributors'
//       />
//       {heritageLocations.map((location, index) => (
//         <Marker key={index} position={[location.latitude, location.longitude]} icon={customIcon}>
//           <Popup>
//             📍 <b>{location.name}</b><br />
//             {location.description}
//             <br />
//             <img
//               src={`http://127.0.0.1:8000${location.image}`}
//               alt={location.name}
//               style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px" }}
//             />
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapComponent;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const [heritageLocations, setHeritageLocations] = useState([]);

  useEffect(() => {
    const fetchHeritageHouses = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        const headers = token ? { Authorization: `Token ${token}` } : {}; // Set headers if token exists

        const response = await axios.get("http://127.0.0.1:8000/api/heritage-houses/", { headers });
        setHeritageLocations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHeritageHouses();
  }, []);

  return (
    <MapContainer
      center={heritageLocations.length ? [heritageLocations[0].latitude, heritageLocations[0].longitude] : [13.9311, 121.6176]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {/* {heritageLocations.map((location) => (
        <Marker key={location.id} position={[location.latitude, location.longitude]} icon={customIcon}>
          <Popup>
            📍 <b>{location.name}</b><br />
            {location.description}
            <br />
            {location.image && (
              <img
                src={`http://127.0.0.1:8000${location.image}`}
                alt={location.name}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px" }}
              />
            )}
          </Popup>
        </Marker>
      ))} */}
      {heritageLocations.map((location, index) => (
        <Marker 
          key={location.id || `location-${index}`}  // Fallback to index if id is missing
          position={[location.latitude, location.longitude]} 
          icon={customIcon}
        >
          <Popup>
            📍 <b>{location.name}</b><br />
            {location.description}
            <br />
            {location.image && (
              <img
                src={`http://127.0.0.1:8000${location.image}`}
                alt={location.name}
                style={{ width: "100%", maxHeight: "200px", objectFit: "cover", marginTop: "10px" }}
              />
            )}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default MapComponent;
