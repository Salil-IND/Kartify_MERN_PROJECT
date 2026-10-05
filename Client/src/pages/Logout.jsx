import { axiosInstance } from "../axiosCalls/axios";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

function Logout(){
  const {setCustomer} = useAuth();
    useEffect(()=>{
      axiosInstance.get('/customer/logout').then((response)=>{
        console.log(response.data.message);
        setCustomer(null);

      })
      .catch(()=>{
        console.log("Error Ho gya...");
      })
    }, [setCustomer])

    return (
        <h2>Logged Out Successfully</h2>
    )
}

export default Logout;