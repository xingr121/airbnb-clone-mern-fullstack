import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchContext } from "../auth/SearchContext";
// import ListingApi from "../api/ListingApi";
import { Card, Container, Row, Col } from "react-bootstrap";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/category/Categories";
import categories from "../components/category/CategoriesList";
// import { CategoryCard } from "../components/category/CategoryCard";
import ListingFilter from "../components/listing/ListingFilter";
import ListingGoogleMap from "../components/listing/ListingGoogleMap";

const BASE_URL = "http://localhost:4000";

const SearchPage = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  console.log(category);
  const [selectedFilter, setSelectedFilter] = useState({
    listingTypes: [],
    facilities: [],
    bedroom: undefined,
    bathroom: undefined,
    bed: undefined,
  });
  const handleCategoryClick = (label) => {
    setCategory(label);
  };
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    guestCount: search.guestCount.toString(),
    page: page.toString(),
    listingTypes: selectedFilter.listingTypes,
    facilities: selectedFilter.facilities,
    averageRate: selectedFilter.averageRate,
    pricePerNight: selectedFilter.pricePerNight?.toString(),
    bedroom: selectedFilter.bedroom?.toString(),
    bathroom: selectedFilter.bathroom?.toString(),
    bed: selectedFilter.bed?.toString(),
    category: category,
  };
  const searchListings = async (searchParams) => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("guestCount", searchParams.guestCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.pricePerNight || "");
    searchParams.facilities?.forEach((facility) =>
      queryParams.append("amenities", facility)
    );

    searchParams.listingTypes?.forEach((listingType) =>
      queryParams.append("listingTypes", listingType)
    );
    searchParams.averageRate?.forEach((star) =>
      queryParams.append("averageRate", star)
    );
    queryParams.append("bedroom", searchParams.bedroom || "");
    queryParams.append("bed", searchParams.bed || "");
    queryParams.append("bathroom", searchParams.bathroom || "");
    queryParams.append("category", searchParams.category || "");
    const response = await fetch(`${BASE_URL}/listing/search?${queryParams}`);

    if (!response.ok) {
      throw new Error("Error fetching listings");
    }

    return response.json();
  };
  const {
    data: listingsData,
    isLoading,
    error,
  } = useQuery(["searchListings", searchParams], () =>
    searchListings(searchParams)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!listingsData || listingsData.data.length === 0) {
    return <div className="mt-5">No listings found.</div>;
  }
  console.log(listingsData.data);

  return (
    <>
      <div className="mb-5">
        <Container>
          <div
            className="d-flex flex-row align-items-center justify-content-between overflow-x-auto"
            style={{ marginTop: "100px" }}
          >
            {categories.map((category) => (
              <div key={category.label}>
                {/* <CategoryCard
                  {...category}
                  className="mb-4"
                  onClick={() => handleCategoryClick(category.label)}
                /> */}
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
            <ListingFilter setSelectedFilter={setSelectedFilter} />
          </div>
        </Container>
      </div>
      <div className="mb-5">
        <div className="pt-0">
          <Container>
            <Row>
              <Col lg={9}>
                <Container>
                  <Row>
                    {listingsData.data.map((listing) => (
                      <Col lg="5" className="mb-4" key={listing._id}>
                        <ListingCard listing={listing} />
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Col>
              <Col lg={3}>
                <ListingGoogleMap listings={listingsData.data} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
