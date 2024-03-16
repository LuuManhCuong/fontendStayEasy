import { refreshToken } from "./authActions";

export const fetchUserInfo = async (setUser, setIsAuthenticated, dispatch)=>{
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại");
      setIsAuthenticated(false);
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

      const response = await fetch("http://localhost:8080/api/v1/stayeasy/user/token", requestOptions);
      const responseData = await response.json();

      if (response.ok) {
        //Nếu thành công thì set user value và login value
        setIsAuthenticated(responseData.login);
        setUser(responseData.user);
      }else if(response.status===500){
        refreshToken(dispatch);
      }
      else{
        setIsAuthenticated(responseData.login);
        setUser(responseData.user);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  } catch (error) {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};
