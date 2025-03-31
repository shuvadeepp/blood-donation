import React, { useContext } from 'react';
import DonorForm from './DonorForm.jsx'; 
import { DONORS_API } from "../../Constants/api";
import Swal from 'sweetalert2';
import { DonorContext } from "../../context/DonorContext";

export default function DonateRegisterPage() {
  
    const { selectedDonor, setSelectedDonor } = useContext(DonorContext);
    // console.log("selectedDonor :::: ", selectedDonor)
    const handleDonorRegisterFrm = async (donorData) => { 
        try {   
            let response;  // hoisted variable

            if (selectedDonor && selectedDonor.id) {
                // UPDATE
                response = await fetch(`${DONORS_API}/${selectedDonor.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(donorData),
                });
            } else { 
                // ADD
                response = await fetch(DONORS_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(donorData),
                });
            }

            if (!response.ok) throw new Error("Failed to register donor");

            Swal.fire("Donor registered successfully!");
            setSelectedDonor(null); // Clear selection after success
        } catch (err) {
            console.error("Error submitting donor data:", err);
            Swal.fire("Failed to register donor. Please try again.");
        }
    };

    return (
        <div> 
            <DonorForm onSubmit={handleDonorRegisterFrm} initialData={selectedDonor} /> 
        </div>
    );
}
