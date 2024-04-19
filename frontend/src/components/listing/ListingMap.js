import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

function ListingMap({ listing }) {
  const signedUrls = listing?.signedUrls || [];
  return (
    <div className="mt-4 border-bottom pb-3">
      <h4>Where you'll be</h4>
      <h6>
        {listing.city}, {listing.province}, {listing.country}
      </h6>
      <MapContainer
        center={
          listing.latitude !== undefined && listing.longitude !== undefined
            ? [listing.latitude, listing.longitude]
            : [45.501689, -73.567256]
        }
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={
            listing.latitude !== undefined && listing.longitude !== undefined
              ? [listing.latitude, listing.longitude]
              : [45.501689, -73.567256]
          }
        >
          <Popup>
            <div className="popup-container">
              <img key={signedUrls[0]} src={signedUrls[0]} alt="" />
              <div className="text-container">
                <Link to="#">{listing.title}</Link>
                <b>$ {listing.price}</b>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default ListingMap;
