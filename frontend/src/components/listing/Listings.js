// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import ListingCard from "../listing/ListingCard";
// import { Container, Row, Col, Spinner } from "react-bootstrap";

// function Listings({ listings }) {
//   const [allListings, setAllListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();
//   const searchCriteria = location.state && location.state.searchCriteria;

//   const [pageCount, setPageCount] = useState(0);
//   const [page, setPage] = useState(0);
//   const listingsPerPage = 8;

//   useEffect(() => {
//     if (searchCriteria) {
//       updateFilteredListings(searchCriteria);
//     } else {
//       axios
//         .get("http://localhost:4000/listing")
//         .then((response) => {
//           console.log("Fetched listings:", response.data);
//           setAllListings(response.data);
//           setFilteredListings(response.data);
//           setPageCount(Math.ceil(response.data.length / listingsPerPage));
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching listings:", error);
//           setLoading(false);
//         });
//     }
//   }, [searchCriteria]);

//   const updateFilteredListings = (searchCriteria) => {
//     const { location, price, guestCount } = searchCriteria;

//     console.log("Filtering with criteria:", searchCriteria);

//     const filtered = allListings.filter((listing) => {
//       const destinationMatch =
//         listing.city.toLowerCase().includes(location.toLowerCase()) ||
//         listing.country.toLowerCase().includes(location.toLowerCase()) ||
//         listing.province.toLowerCase().includes(location.toLowerCase());

//       const guestCountMatch = listing.guestCount >= guestCount;
//       const priceMatch = Number(listing.price) <= Number(price);

//       return destinationMatch && priceMatch && guestCountMatch;
//     });

//     console.log("Filtered listings:", filtered);

//     setFilteredListings(filtered);
//     setPage(0);
//   };

//   const startIdx = page * listingsPerPage;
//   const endIdx = startIdx + listingsPerPage;
//   const displayedListings = filteredListings.slice(startIdx, endIdx);

//   return (
//     <div className="pt-0">
//       <Container>
//         {loading ? (
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Fetching Listings...</span>
//           </Spinner>
//         ) : (
//           <Row>
//             {displayedListings.map((listing) => (
//               <Col lg="3" className="mb-4" key={listing._id}>
//                 <ListingCard listing={listing} />
//               </Col>
//             ))}
//           </Row>
//         )}

//         <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
//           {[...Array(pageCount).keys()].map((num) => (
//             <span
//               key={num}
//               onClick={() => setPage(num)}
//               className={page === num ? "active_page" : ""}
//             >
//               {num + 1}
//             </span>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Listings;
