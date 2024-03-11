export const fetchUserInfo = (setUser)=>{
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
    } else {
      const token = localStorage.getItem("access_token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/v1/stayeasy/user/token", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw Error(response.status);
        })
        .then((result) => {
          setUser(result);
        })
        .catch((error) => console.error(error));
    }
  } catch (error) {

  }
};
