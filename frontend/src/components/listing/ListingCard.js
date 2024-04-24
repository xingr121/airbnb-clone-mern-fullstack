import React from "react";
import { Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Card.scss";
// import calculateAvgRating from "../../util/AvgRating";

function ListingCard({ listing }) {
  const {
    title,
    pricePerNight,
    type,
    signedUrls, // By Michael: Replaced listingPhotoPaths with signedUrls
    city,
    province,
    country,
    isFavorite,
    averageRate,
  } = listing;

  const price = parseFloat(pricePerNight["$numberDecimal"]);

  // const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="listing_card">
      <Link
        to={`/listings/${listing._id}`}
        style={{ cursor: "pointer" }}
        className="text-decoration-none"
      >
        <Card className="border-0 shadow h-100">
          {/* Photo */}
          <div className="">
            <img
              src={signedUrls[0]}
              alt=""
              className="listing_img"
              style={{ height: "275px", width: "100%" }}
            />
            {isFavorite && (
              <span className="position-absolute top-0 end-0 bg-light text-dark p-2 rounded-pill m-2 fw-700">
                Guest Favorite
              </span>
            )}
          </div>
        </Card>

        <CardBody>
          {/* Location */}
          <div className="card_top d-flex align-items-center justify-content-between">
            <span className="listing_location d-flex align-items-center gap-1">
              {city}, {province}, {country}
            </span>
            {/* Ratings */}
            <span className="listing_rating d-flex align-items-center gap-1">
              <i className="bi bi-star-fill"></i>
              {averageRate.toFixed(1)}
            </span>
          </div>
          {/* Title */}
          <h6 className="listing_title mt-2 text-dark">{title}</h6>
          {/* Type */}
          <p className="text-dark">{type}</p>
          {/* Availability */}
          {/* Price */}
          <div className="card_bottom d-flex align-items-center justify-content-between">
            <h6 className="fw-700">
              ${price.toFixed(2)}
              <span className="fw-500 text-dark"> night</span>
            </h6>
          </div>
        </CardBody>
      </Link>
    </div>
  );
}

export default ListingCard;
