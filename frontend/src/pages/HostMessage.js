import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import avatar from "../assets/images/avatar.jpg";
import "../styles/ListingDetails.scss";
import BookingWidget from "../components/booking/BookingWidget2";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "../api/UserApi";

function HostMessage() {
  const { id } = useParams();

  const { currentUser } = useGetMyUser();

  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/listing/${id}`
        );
        setListing(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const sendMessage = async () => {
    const accessToken = await getAccessTokenSilently();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/message`,
        {
          sender: currentUser._id,
          receiver: listing.host._id,
          messageContent: message,
          listing: listing._id,
          timestamp: new Date(),
          messageStatus: "Unread",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Message sent successfully");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <>
      <Container className="message-container">
        <div>
          <div className="back mt-5 pt-3">
            <Link className="text-dark" to={`/listings/${id}`}>
              <FaChevronLeft fontSize="25px" />
            </Link>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3 pb-3 border-bottom">
            {listing && listing.host && (
              <>
                <h4 className="">{listing.host.username}</h4>
                {/* <h4> Contact Mark</h4> */}
                <img
                  className="rounded-circle m-4 text-center"
                  src={listing.host.imageUrl || avatar}
                  // src={avatar}
                  alt="profile"
                  width="100"
                  height="100"
                />
              </>
            )}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ height: "200px" }}
            />
            <Button
              className="btn btn-light border-dark mt-3 py-3 px-4"
              onClick={sendMessage}
            >
              Send message
            </Button>
          </div>
        </div>
        {listing && <BookingWidget listing={listing} />}
      </Container>
    </>
  );
}

export default HostMessage;
