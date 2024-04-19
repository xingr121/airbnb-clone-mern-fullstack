import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import avatar from "../../assets/images/avatar.jpg";
import "../../styles/ListingDetails.scss";
import BookingWidget from "../booking/BookingWidget2";

function HostMessage({ listing }) {
  return (
    <>
      <Container className="message-container">
        <div>
          <div className="back mt-5 pt-3">
            <Link className="text-dark" to="/listings/:id">
              <FaChevronLeft fontSize="25px" />
            </Link>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 pb-3 border-bottom">
            {/* <h6 className="">{listing.host.username}</h6> */}
            <h4> Contact Mark</h4>
            <img
              className="rounded-circle m-4 text-center"
              // src={listing.host.imageUrl || avatar}
              src={avatar}
              alt="profile"
              width="50"
              height="50"
            />
          </div>
          <div className="mt-3 pb-3 border-bottom">
            <h4 className="mb-3">Most travellers ask about</h4>

            <h6>Getting there</h6>
            <ul className="pl-0">
              <li>Free parking on the premises</li>
              <li>
                Check-in time for this home starts at 4:00 p.m. and checkout is
                at 11:00 a.m.
              </li>
            </ul>
            <h6>House details and rules:</h6>
            <ul className="pl-0">
              <li>No smoking. No parties or events.</li>
            </ul>
            <h6>Price and availability:</h6>
            <ul className="pl-0">
              <li>Full refund within limited period</li>
            </ul>
          </div>
          <div className="mt-3 pb-3 border-bottom">
            <h4>Still have questions? Message the Host</h4>
            <textarea
              className="mt-2 w-100 rounded-4 p-3"
              type="text"
              style={{ height: "200px" }}
            />
            <Button className="btn btn-light border-dark mt-3 py-3 px-4">
              Send message
            </Button>
          </div>
        </div>
        <BookingWidget />
      </Container>
    </>
  );
}

export default HostMessage;
