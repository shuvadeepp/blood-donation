import React, { useState, useEffect, useContext } from "react";
import { DonorContext } from "../../context/DonorContext";
import { useNavigate } from "react-router-dom";
import { DONORS_API } from "../../Constants/api";
import { BLOOD_GROUPS } from "../../Constants/BloodGroups";
import { formatDate } from "../../Constants/Config";

export default function DonorList() {
    const { setSelectedDonor } = useContext(DonorContext);
    const navigate = useNavigate();
    
    const [donors, setDonors] = useState([]);
    // console.log("donors ::::::: ", donors)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    
    /* :::::::::: PEGINATION :::::::::: */
    const perPage = 5;
    const totalPages = Math.ceil(donors.length / perPage);
    const indexOfLastDonor = currentPage * perPage;
    const indexOfFirstDonor = indexOfLastDonor - perPage;
    const sortedDonors = [...donors].sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
    const currentDonors = sortedDonors.slice(indexOfFirstDonor, indexOfLastDonor);
    /* :::::::::: PEGINATION :::::::::: */

    // Fetch donor data from API
    useEffect(() => {
        setLoading(true);
        fetch(DONORS_API)
            .then((response) => response.json())
            .then((data) => {
                setDonors(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching donors:", err);
                setLoading(false);
            });
    }, []);

    // Function to get blood group name from ID
    const getBloodType = (id) => {
        const bloodGroup = BLOOD_GROUPS.find((group) => String(group.id) === String(id));
        return bloodGroup ? bloodGroup.bloodType : " -- ";
    };

    // Function to handle Edit button click
    const handleEdit = (donor) => {
        // console.log("donor :::::: ", donor);
        setSelectedDonor(donor);
        navigate("/form");
    };

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading donors...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-6xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Sl#</th>
                                <th scope="col" className="px-6 py-3">Donor Name</th>
                                <th scope="col" className="px-6 py-3">Donor MailID</th>
                                <th scope="col" className="px-6 py-3">Donor Mobile</th>
                                <th scope="col" className="px-6 py-3">Blood Group</th>
                                <th scope="col" className="px-6 py-3">Location</th>
                                <th scope="col" className="px-6 py-3">Created At</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDonors.map((donor, index) => (
                                <tr key={donor.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">{indexOfFirstDonor + index + 1}</td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {donor.donorName}
                                    </th>
                                    <td className="px-6 py-4">{donor.donorMailId}</td>
                                    <td className="px-6 py-4">{donor.donorMob}</td>
                                    <td className="px-6 py-4">{getBloodType(donor.selBloodType)}</td> 
                                    <td className="px-6 py-4">{donor.PreferLocation}</td>
                                    <td className="px-6 py-4">{formatDate(donor.donationDate)}</td> 
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(donor)}
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                                Edit
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-5 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Previous
                    </button>

                    <span className="px-4 py-2 text-gray-700">Page {currentPage} of {totalPages}</span>

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
