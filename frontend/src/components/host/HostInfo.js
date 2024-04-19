import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import "../../styles/ListingDetails.scss";
import HostCard from "./HostCard";

function HostInfo({ listing }) {
  const { id } = useParams();

  return (
    <div className="mt-4 pb-3">
      <h4>Meet your Host</h4>

      <Container className="host-container pb-4">
        <Row className="">
          <Col lg="5" className="">
            <Link to="/host/profile" className="text-dark text-decoration-none">
              {listing && listing.host && <HostCard listing={listing} />}
            </Link>
            {/* Information about the Host */}
            {/* To Delete */}
          </Col>

          <Col>
            <div className="d-flex flex-column mt-4">
              <h5>About {listing.host.username}</h5>
              <span>Born in the 90's </span>
              <span>Lives in Montreal, Qc, Canada</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mt-4 mb-3">Host Details</h6>

              <span>Response rate: 100%</span>
              <span>Responds within an hour</span>

              <Link
                to={`/contact_host/${id}`}
                className="message-btn btn btn-dark px-4 py-3 mt-4 w-25"
              >
                Message Host
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HostInfo;
