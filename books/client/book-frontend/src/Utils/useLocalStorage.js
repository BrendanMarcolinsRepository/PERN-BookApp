import { useState } from "react";

const useLocalStorage = (keyname, defaultValue) => {

    const [storedValue, setStoredValue] = useState(() => {
        try{
            const value = window.localStorage.getItem(keyname);
            
            if(value){
                console.log("here 23" + value)
                return JSON.parse(value);
            }else{

                console.log("here 2")

                window.localStorage.setItem(keyname,JSON.stringify(defaultValue));
                return defaultValue;
            }
        
        }catch(e){
            console.log("here 24")
            return defaultValue;
        }

    });

    const setValue = (newValue) => {
        try{
            window.localStorage.setItem(keyname, JSON.stringify(newValue));


        }catch(e){
           
        }

        setStoredValue(newValue);
    }

    return [storedValue, setValue]

}

export default useLocalStorage;