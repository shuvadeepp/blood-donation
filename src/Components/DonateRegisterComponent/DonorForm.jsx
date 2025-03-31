import React, { useState, useEffect } from "react";
import './Donate.css';
import MyDatePicker from '../DatePickerComponent/MyDatePicker ';
import { BLOOD_GROUPS } from "../../Constants/BloodGroups";

export default function DonorForm({ onSubmit, initialData  }){

    // console.log("initialData :::: ", initialData)
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState(initialData || {
        donorName: "",
        donorMailId: "",
        donorMob: "",
        selBloodType: "",
        PreferLocation: "",
        donationDate: ""
    }) 

    useEffect(()=>{
        setFormData(initialData || {
            donorName: "",
            donorMailId: "",
            donorMob: "",
            selBloodType: "",
            PreferLocation: "",
            donationDate: "",
        });
    }, [initialData]);

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleDateChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            donationDate: date,  
        }));
    };
    
    

    const validate = () => {
      let tempErrors = {};
  
      if (!formData.donorName.trim()) tempErrors.donorName = "Name is required";
      if (!formData.donorMailId.trim()) tempErrors.donorMailId = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.donorMailId)) tempErrors.donorMailId = "Invalid email format";
  
      if (!formData.donorMob.trim()) tempErrors.donorMob = "Mobile number is required";
      else if (!/^\d{10}$/.test(formData.donorMob)) tempErrors.donorMob = "Mobile number must be 10 digits";
  
      if (!formData.selBloodType) tempErrors.selBloodType = "Select a blood type";
      if (!formData.PreferLocation.trim()) tempErrors.PreferLocation = "Preferred location is required";
      if (!formData.donationDate) tempErrors.donationDate = "Select a donation date";
  
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validate()) {
          onSubmit(formData);
          setFormData({
            donorName: "",
            donorMailId: "",
            donorMob: "",
            selBloodType: "",
            PreferLocation: "",
            donationDate: "",
          });
          setErrors({});
        }
    }; 

    return(
        <>
            <div className="donate-container">
                <h1>Book Your Blood Donation Slot</h1>
                <p>
                    Thank you for your interest in donating blood! Please fill out the form
                    below to book a slot for your donation.
                </p>
            
                <form className="donation-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="donorName"
                            name="donorName"  
                            value={formData.donorName}
                            onChange={handleChange}
                            placeholder="Enter Your Name"  
                        />
                        {errors.donorName && <small style={{ color: "red" }}>{errors.donorName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Email ID</label>
                        <input
                            type="text"
                            id="donorMailId"
                            name="donorMailId"  
                            value={formData.donorMailId}
                            onChange={handleChange}
                            placeholder="Enter Your Email ID"  
                        />
                        {errors.donorMailId && <small style={{ color: "red" }}>{errors.donorMailId}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Mobile No.</label>
                        <input
                            type="text"
                            id="donorMob"
                            name="donorMob"  
                            value={formData.donorMob}
                            onChange={handleChange}
                            placeholder="Enter Your Phone No."  
                            maxLength={10}
                        />
                        {errors.donorMob && <small style={{ color: "red" }}>{errors.donorMob}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Blood Type</label>
                        <select 
                            id="selBloodType" 
                            name="selBloodType" 
                            value={formData.selBloodType} 
                            onChange={handleChange}
                        >
                        <option value="">--Select--</option>
                        {BLOOD_GROUPS.map((group) => (
                            <option key={group.id} value={group.id} data-value={group.bloodType}> {group.bloodType} </option>
                        ))}
                        </select>
                        {errors.selBloodType && <small style={{ color: "red" }}>{errors.selBloodType}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Preferred Donation Location</label>
                        <input
                            type="text"
                            id="PreferLocation"
                            name="PreferLocation"  
                            value={formData.PreferLocation}
                            onChange={handleChange}
                            placeholder="Enter Location"  
                        />
                        {errors.PreferLocation && <small style={{ color: "red" }}>{errors.PreferLocation}</small>}
                    </div> 

                    <div className="form-group w-full">
                        
                        <MyDatePicker 
                            handleChange={handleDateChange} 
                            value={formData.donationDate} 
                        /> 
                    {errors.donationDate && <small style={{ color: "red" }}>{errors.donationDate}</small>}
                    </div>

                    <button type="submit" className="submit-button"> { initialData ? "Update" : "Submit" } </button>

                </form>
            </div>
        </>
    )
}