import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import categories from "../components/category/CategoriesList";
import { CategoryCard } from "../components/category/CategoryCard";
// import Listings from "../components/listing/Listings";
import ListingCard from "../components/listing/ListingCard";
import Search from "../components/header/Search";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import "../styles/Search.scss";

import { MdMap } from "react-icons/md";

function Home() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [loading, setLoading] = useState(true);

  // const location = useLocation();
  // const searchCriteria = location.state && location.state.searchCriteria;

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const listingsPerPage = 8;
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/listing?category=${category}`)
      .then((response) => {
        setAllListings(response.data);
        setFilteredListings(response.data);
        setPageCount(Math.ceil(response.data.length / listingsPerPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listings by category:", error);
        setLoading(false);
      });
  }, [category]);
  const handleCategoryClick = (label) => {
    setCategory(label);
  };
  // const updateFilteredListings = (searchCriteria) => {
  //   const { location, price, guestCount } = searchCriteria;

  //   console.log("Filtering with criteria:", searchCriteria);

  //   const filtered = allListings.filter((listing) => {
  //     const destinationMatch =
  //       listing.city.toLowerCase().includes(location.toLowerCase()) ||
  //       listing.country.toLowerCase().includes(location.toLowerCase()) ||
  //       listing.province.toLowerCase().includes(location.toLowerCase());

  //     const priceMatch = Number(listing.price) <= Number(price);
  //     const guestCountMatch = listing.guestCount >= guestCount;

  //     return destinationMatch && priceMatch && guestCountMatch;
  //   });

  //   console.log("Filtered listings:", filtered);

  //   setFilteredListings(filtered);
  //   setPage(0);
  // };

  const startIdx = page * listingsPerPage;
  const endIdx = startIdx + listingsPerPage;
  const displayedListings = filteredListings.slice(startIdx, endIdx);

  return (
    <>
      {/* <div className="search d-flex justify-content-center align align-items-center">
        <Search onSearch={updateFilteredListings} />
      </div> */}
      <div className="mb-5">
        <Container>
          <div
            className="d-flex flex-row align-items-center justify-content-between overflow-x-auto"
            style={{ marginTop: "100px" }}
          >
            {categories.map((category) => (
              <div key={category.label}>
                <Card
                  className="rounded-circle border-0 shadow-sm"
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick(category.label)}
                >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <div className="text-center mb-3">
                      <category.Icon size={20} />
                    </div>
                    <Card.Title
                      className="text-center fw-medium"
                      style={{ fontSize: "10px" }}
                    >
                      {category.label}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="mb-5">
        <div className="pt-0">
          <Container>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Fetching Listings...</span>
              </Spinner>
            ) : (
              <Row>
                {displayedListings.map((listing) => (
                  <Col lg="3" className="mb-4" key={listing._id}>
                    <ListingCard listing={listing} />
                  </Col>
                ))}
              </Row>
            )}

            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(pageCount).keys()].map((num) => (
                <span
                  key={num}
                  onClick={() => setPage(num)}
                  className={page === num ? "active_page" : ""}
                >
                  {num + 1}
                </span>
              ))}
            </div>
          </Container>
        </div>
      </div>
      <div
        className="
            p-3
            border
            border-secondary
            d-flex 
            flex-row 
            align-items-center 
            rounded-pill 
            shadow-sm
            bg-dark
            text-white
            position-fixed
            start-50
            translate-middle-x
          "
        style={{ cursor: "pointer", zIndex: 1000, bottom: "100px" }}
      >
        Show Map
        <MdMap />
      </div>
    </>
  );
}

export default Home;
