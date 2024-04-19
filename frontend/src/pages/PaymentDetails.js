// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";

// function PaymentDetails() {
//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//   const { getAccessTokenSilently } = useAuth0();
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [booking, setBooking] = useState(null);
//   const [error, setError] = useState("");
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const sessionId = query.get("session_id");

//     if (sessionId) {
//       axios
//         .get(`${API_BASE_URL}/booking/payment-details?session_id=${sessionId}`)
//         .then((response) => {
//           setPaymentDetails(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching payment details:", error);
//           setError("Failed to retrieve payment details.");
//         });
//     }
//   }, []);

//   useEffect(() => {
//     async function createBooking() {
//       if (paymentDetails && paymentDetails.paymentStatus === "succeeded") {
//         try {
//           const accessToken = await getAccessTokenSilently();
//           const bookingData = {
//             listing: paymentDetails.metadata.listingId,
//             checkInDate: paymentDetails.metadata.checkInDate,
//             checkOutDate: paymentDetails.metadata.checkOutDate,
//             totalPrice: paymentDetails.amountPaid,
//             bookingStatus: paymentDetails.metadata.bookingStatus,
//             paymentId: paymentDetails.paymentId,
//           };

//           const response = await axios.post(
//             `${API_BASE_URL}/booking/book`,
//             bookingData,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );
//           setBooking(response.data);
//         } catch (error) {
//           console.error("Error creating booking:", error);
//           setError("Failed to create booking.");
//         }
//       }
//     }

//     if (paymentDetails) {
//       createBooking();
//     }
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!paymentDetails) {
//     return <div>Loading payment details...</div>;
//   }

//   return (
//     <div>
//       <h1>Payment Details</h1>
//       <p>Status: {paymentDetails.paymentStatus}</p>
//       <p>
//         Amount Paid: {paymentDetails.amountPaid} {paymentDetails.currency}
//       </p>
//       <p>Payment ID: {paymentDetails.paymentId}</p>
//       {booking && <p>Booking Created! Booking ID: {booking._id}</p>}
//     </div>
//   );
// }

// export default PaymentDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";

function PaymentDetails() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      axios
        .get(`${API_BASE_URL}/booking/payment-details?session_id=${sessionId}`)
        .then((response) => {
          setPaymentDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching payment details:", error);
          setError("Failed to retrieve payment details.");
        });
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!paymentDetails) {
    return <div>Loading payment details...</div>;
  }

  return (
    <div>
      <h1>Payment Details</h1>
      <p>Status: {paymentDetails.paymentStatus}</p>
      <p>
        Amount Paid: {paymentDetails.amountPaid} {paymentDetails.currency}
      </p>
      <p>Payment ID: {paymentDetails.paymentId}</p>
      <p>Booking Created! </p>
    </div>
  );
}

export default PaymentDetails;
