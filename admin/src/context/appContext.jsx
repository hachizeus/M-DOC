import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    
    const currency = 'Ksh'
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age 
    }

    const months = ["","Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"]

    const slotDateformat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }
    
    const value = {
        calculateAge,
        slotDateformat,
        currency
    }
    return (
        <AppContext.Provider value ={value} >
        {props.children}
        </AppContext.Provider>
    )
    
}
export default AppContextProvider