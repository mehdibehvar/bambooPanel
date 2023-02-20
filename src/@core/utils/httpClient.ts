import axios from "axios";
import dataConfig from "src/configs/data";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export const getAllStudents = async (storedToken:any) => {
  try {
    if(storedToken){
        const result = await axios.get(dataConfig.getAllStudentsEndpoint,{
            headers:{
                "x-auth-token":storedToken
            }
        });

        return result.data;
    }
 
    
  } catch (error) {
    console.log(error);
  }

  return {};
};
