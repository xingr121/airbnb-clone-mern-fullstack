import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pin from "../listing/Pin";
import {
  LoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

import "../../styles/ListingDetails.scss";
// import { BsHouseCheck } from "react-icons/bs";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
// } from "@vis.gl/react-google-maps";

function ListingGoogleMap({ listings }) {
  const key = process.env.REACT_APP_GOOGLE_MAP_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;
  // const [center, setCenter] = useState({ lat: 0, lng: 0 });

  // try {
  //   const address = "montreal";
  //   const results = getGeocode({ address });
  //   const { lat, lng } = getLatLng(results[0]);
  //   setCenter({ lat, lng });
  // } catch (error) {
  //   console.error("Error getting address LatLng:", error);
  // }

  const center = {
    lat: 45.501689,
    lng: -73.567256,
  };

  const containerStyle = {
    width: "70%",
    height: "400px",
  };
  return (
    <div>
      {" "}
      <LoadScript googleMapsApiKey={key} mapIds={["2e32cbf919ca80a5"]}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          options={{ mapId: mapId }}
          zoom={10}
        >
          {listings.map((listing) => (
            <Pin listing={listing} key={listing._id} />
          ))}
          {/* <MarkerF position={center} onClick={handleMarkerClick}>
            {isOpen && (
              <InfoWindow
                onCloseClick={() => {
                  setIsOpen(false);
                }}
              >
                <div className="popup-container">
                  <img alt="" />
                  <div className="text-container">
                    <Link to="#">title</Link>
                    <b>price</b>
                  </div>
                </div>
              </InfoWindow>
            )}
          </MarkerF> */}
        </GoogleMap>
      </LoadScript>
      {/* <APIProvider apiKey={key}>
        <div style={containerStyle}>
          <Map zoom={10} center={center} mapId={mapId}>
            <Marker position={center}>
              <h2>I am so customized</h2>
              <p>That is pretty awesome!</p>
            </Marker>
          </Map>
        </div>
      </APIProvider> */}
    </div>
  );
}

export default ListingGoogleMap;
