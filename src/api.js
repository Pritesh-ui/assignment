export const User = async () => {
    try {
      const url = "https://jsonplaceholder.typicode.com/users";
      const response = await fetch(url);
  
     
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };

export const getUserByID = async (id) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const response = await fetch(url);
  
     
  
      const data = await response.json();
      // console.log("getUserPostID *****", data)
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  };

  export const fetchCountry = async (selectedCountry) => {
    try {
      const url = "http://worldtimeapi.org/api/timezone";
      const countryName = await fetch(url);
      const data = await countryName.json();
      // console.log(data)
        return data;
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error as needed
    }
  }
  export const fetchCountrytime = async (selectedCountry) => {
    console.log("*****",selectedCountry);
    try {
      const url = `http://worldtimeapi.org/api/timezone/${selectedCountry}`;
      const countrytime = await fetch(url);
      
      const data = await countrytime.json();
      // console.log("timezone",data)
    
       return data;
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error as needed
    }
  }
  
  export const postdata = async (post) => {
    
    try {
      const url = `https://jsonplaceholder.typicode.com/posts`;
      const post = await fetch(url);
      // console.log(post,"dkmdmkdmkdf");
      const data = await post.json();
      // console.log(data);
       return data;
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error as needed
    }
  }

  
export const getUserPostID = async (id) => {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(url);

   

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};




 