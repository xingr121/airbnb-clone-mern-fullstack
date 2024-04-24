import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pin from "../listing/Pin";
import {
  useJsApiLoader,
  LoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { useGetMyUser } from "../../api/UserApi";
import "../../styles/ListingDetails.scss";
// import { BsHouseCheck } from "react-icons/bs";

function ListingGoogleMap({ listings, containerStyle }) {
  const key = process.env.REACT_APP_GOOGLE_MAP_KEY;
  const mapId = process.env.REACT_APP_MAP_ID;
  // const { currentUser, isLoading } = useGetMyUser();
  const [center, setCenter] = useState({ lat: 45.501689, lng: -73.567256 });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        alert(error);
      }
    );
  } else {
  }
  // try {
  //   const address = "montreal";
  //   const results = getGeocode({ address });
  //   const { lat, lng } = getLatLng(results[0]);
  //   setCenter({ lat, lng });
  // } catch (error) {
  //   console.error("Error getting address LatLng:", error);
  // }
  const { isLoaded } = useJsApiLoader({
    id: process.env.REACT_APP_MAP_ID,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
  });
  // const center = {
  //   lat: 45.501689,
  //   lng: -73.567256,
  // };

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={{ mapId: mapId }}
        zoom={10}
      >
        {listings.map((listing) => (
          <Pin listing={listing} key={listing._id} />
        ))}
      </GoogleMap>
    )
  );
}

export default ListingGoogleMap;
