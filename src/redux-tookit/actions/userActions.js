import { Alert } from "../../components/Alert/Alert";
import { refreshToken } from "./authActions";
import { counterSlice } from "../../redux-tookit/reducer/counterSlice";

export const fetchUserInfo = async (setUser, setIsAuthenticated, dispatch)=>{
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
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

      const response = await fetch("http://localhost:8080/api/v1/user/token", requestOptions);
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
        Alert(2000, 'Thông báo', 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại', 'warning', 'OK');
      }
    }
  } catch (error) {
    setIsAuthenticated(false);
    setUser(null);
  }
};


//Update Information
export const updateInformation = (title, raw, setIsDisabled, setIsEditing, isEditing) => async(dispatch) =>{
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch(`http://localhost:8080/api/v1/user/update`, requestOptions);
      const responseData = await response.json();
      if(response.ok){
        dispatch(counterSlice.actions.increase());
        setIsDisabled(0);
        setIsEditing(!isEditing);
        Alert(2000, `Thay đổi ${title}`, 'Thay đổi thành công', 'success', 'OK');
      }
      else if(response.status===403){
        //Lỗi không tìm thấy user trong token(token trong db đã bị xóa hoặc vô hiệu hóa)
        Alert(2000, `Thay đổi ${title}`, 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại', 'warning', 'OK');
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(counterSlice.actions.increase());
      }else{
        //Lỗi Server
        Alert(2000, `Thay đổi ${title}`, 'Thay đổi không thành công', 'error', 'OK');
      }
    }
  } 
  catch (error) {
    console.error(error);
  }
};

