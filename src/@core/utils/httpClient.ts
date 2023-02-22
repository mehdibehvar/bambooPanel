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
export const getAllTeachers = async (storedToken:any) => {
  try {
    if(storedToken){
        const result = await axios.get(dataConfig.getAllTeachersEndpoint,{
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
export const getAllCourses=async ()=>{
  try {
    const response=await axios.get(dataConfig.getAllCoursesEndpoint);
  
    return response.data;
  } catch (error) {
    console.log(error);
    
  }

}
export const deleteCourseById=async (id:string,storedToken:string)=>{
  try {
    const response=await axios.delete(`${dataConfig.deleteCourseEndpoint}/${id}`,{
      headers:{
        "x-auth-token" :storedToken
      }
    });

    return response.data;
  } catch (error) {
    console.log(error);
    
  }

}

   export const uploadImage=async(file:any)=>{
    const data = new FormData();
  data.append('image', file[0]);
try {
  const response=await axios.post(dataConfig.uploadEndpoint,data,{
    headers:{
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json', 
    }

  });

  return response.data.result;
} catch (error) {
  console.log(error);
  
}

   }