// import React from "react";

// function ReviewInfo() {
//     // Extract reviews for the selected listing
//     const reviews = listing?.reviews || [];

//     // Calculate average rating
//     const { totalRating, avgRating } = calculateAvgRating(reviews);

//     }
//   return (
//     <>
//       {/* Rating */}
//       <div className="border-bottom pb-3">
//         <h4 className="mt-3 d-flex align-items-center gap-1">
//           <i className="bi bi-star-fill"></i>
//           {avgRating === 0 ? null : avgRating}
//           {totalRating === 0 ? (
//             "Not yet rated"
//           ) : (
//             <span>| {reviews.length} reviews</span>
//           )}
//         </h4>
//         {/* Reviews */}
//         {/* ToDo; Retrieve Review Information by Guest*/}
//         <div className="mt-3">
//           {reviews.map((review) => (
//             <div
//               key={review.reviewId}
//               className="listing-review d-flex flex-row"
//             >
//               {/* Retrieve Users Information */}
//               <div>
//                 <img
//                   className="rounded-circle"
//                   src={avatar}
//                   alt="profile"
//                   width="50"
//                   height="50"
//                 />
//               </div>
//               {/* Retrieve Users information by userID --> name city country */}
//               <div className="d-flex flex-column">
//                 <h6>User Name</h6>
//                 <p>New York, New York</p>

//                 {/* Reviews with stars and date */}
//                 <div className="d-flex align-items-center">
//                   <span className="me-2">{review.rating} stars</span>
//                   <span>{review.reviewText}</span>
//                   <span className="me-2">{review.reviewDate}</span>
//                 </div>
//                 {/* Review Text */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ReviewInfo;
