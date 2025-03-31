import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

const MyDatePicker = ({ handleChange, value }) => {
  const [selectedDate, setSelectedDate] = useState(value || null);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    handleChange(date);  
  };

  return ( 
    <>
      <label htmlFor="donationDate">Preferred Donation Date</label> 
      <DatePicker
        selected={selectedDate}
        onChange={handleDateSelect}
        dateFormat="dd-MM-yyyy"
        minDate={new Date()} // Disable past dates
        placeholderText="Select a date"
        className="w-full p-2 border border-gray-300 rounded-md"
      />  
    </>
  );
};

export default MyDatePicker;
