import { createContext, useState } from "react";

// Create Context
export const DonorContext = createContext();
// console.log("DonorContext ::::: ", DonorContext)
// Provider Component
export const DonorProvider = ({ children }) => {
    
    const [selectedDonor, setSelectedDonor] = useState(null);

    return (
        <DonorContext.Provider value={{ selectedDonor, setSelectedDonor }}>
            {children}
        </DonorContext.Provider>
    );
};
