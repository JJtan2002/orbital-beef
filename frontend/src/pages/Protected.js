import React from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import axios from "axios";

const Protected = () => {
    const apiProtected = useAxiosPrivate();

    const getProtectedData = async () => {
        try {
          const response = await apiProtected.get('/protected/');
          // const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/protected/');
          console.log('Protected data:', response.data);
          // Handle response data as needed
        } catch (error) {
          console.error('Error fetching protected data:', error);
          // Handle error
        }
    };

    return (
        <div>
          <h1>Protected Page</h1>
          <button onClick={getProtectedData}>Fetch Protected Data</button>
          {/* Display protected data or other content */}
        </div>
    );
}

export default Protected;