import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../auth/SearchContext";
import { useNavigate } from "react-router-dom";
function Search() {
  // const [location, setLocation] = useState("");
  // // const [dateRange, setDateRange] = useState("");
  // const [guestCount, setGuestCount] = useState(null);
  // const [price, setPrice] = useState(null);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const searchCriteria = {
  //     location,
  //     guestCount,
  //     price,
  //   };
  //   console.log("Search submitted:", { location, guestCount, price });
  //   onSearch(searchCriteria);
  // };
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(new Date(search.checkIn));
  const [checkOut, setCheckOut] = useState(new Date(search.checkOut));
  const [guestCount, setGuestCount] = useState(search.guestCount);

  const handleSubmit = (event) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, guestCount);
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="d-flex gap-2 border border-gray-300 rounded-pill py-2 px-4 shadow"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Anywhere"
        value={destination || ""}
        onChange={(e) => setDestination(e.target.value)}
        className="border-0 w-75"
      />
      <div className="flex border border-gray-300"></div>
      <div>
        <span>checkin</span>
        <DatePicker
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 border-0"
          wrapperClassName="min-w-full"
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      <div>
        <span>checkout</span>
        <DatePicker
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2 border-0"
          wrapperClassName="min-w-full"
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      <div
        className="border
       border-gray-300"
      ></div>
      <div>
        {" "}
        <span>Add Guests</span>
        <input
          type="number"
          min={1}
          placeholder="Add Guests"
          value={guestCount || ""}
          onChange={(e) => setGuestCount(parseInt(e.target.value))}
          className="border-0 text-center"
        />
      </div>

      <button
        className="rounded-pill text-white"
        type="submit"
        style={{
          backgroundColor: "#FF5A5F",
          border: "none",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          padding: "10px 20px",
        }}
      >
        <BiSearch size={18} />
      </button>
    </form>
  );
}

export default Search;
