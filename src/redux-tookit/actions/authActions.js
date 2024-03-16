import Swal from "sweetalert2";
import { counterSlice } from "../reducer/counterSlice";


// Method login
export const login = (data) => (dispatch) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // create data
  const raw = JSON.stringify({
    email: data.username,
    password: data.loginPassword,
  });

  // create request option
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //fetch api
  fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.status);
    })
    .then((result) => {
      // save token to localStorage
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);

      dispatch(counterSlice.actions.increase());

      //set message to default
      data.setMessage("", "", "");
      
      if(data.toggleClosePopup){
        data.toggleClosePopup();
      }
      if(data.location){
        // const search = data.location.state?.search || '';
        // Kiểm tra nếu có thông tin trang trước đó, chuyển hướng lại đó sau khi đăng nhập thành công
        const from = data.location.state?.from?.pathname || '/'; data.navigate(from, { replace: true });
      }
      Swal.fire({
        timer: 1500,
        title: 'OK!',
        text: 'Đăng nhập thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    })
    .catch((error) => {
      data.setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
    });
};


// Method sign-up
export const signup = (data) => async (dispatch) => {
  try {
      if (!data.username || !data.registerPassword || !data.confirmPassword) {
        return data.setErrorMessage("Vui lòng nhập thông tin!");
      }

      if (!/\S+@\S+\.\S+/.test(data.username)) {
        return data.setErrorMessage("Email không hợp lệ!");
      }

      if (data.registerPassword !== data.confirmPassword) {
        return data.setErrorMessage("Mật khẩu không khớp!");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
          email: data.username,
          password: data.registerPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          role: "USER",
      });

      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };

      const response = await fetch("http://localhost:8080/api/v1/auth/register", requestOptions);
      const responseData = await response.json();

      if (response.ok) {
          data.setMessage("","","Đăng kí thành công thành công. Mời bạn đăng nhập!");
          data.setIsSecondForm(false);
          data.setisLogin(true);
      } else {
          data.setErrorMessage(responseData.message || "Có lỗi xảy ra!");
      }
  } catch (error) {
      data.setErrorMessage(error.message || "Có lỗi xảy ra khi đăng ký!");
  }
};


// Method Logout
export const logout = (navigate) => async (dispatch) => {
  if (localStorage.getItem("access_token") != null) {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/auth/logout", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(counterSlice.actions.increase());
        navigate("/");
        Swal.fire({
          timer: 1500,
          title: 'OK!',
          text: 'Đăng Xuất thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch((error) => {
        console.error(error);
        alert("Đăng xuất thất bại!");
      });
  } else {
    alert("Bạn chưa đăng nhập!");
  }
};

// Method changePass
export const changePassword = (data) => async (dispatch) => {
  if(data.newpassword===data.confirmpassword){
    try {
      const token = localStorage.getItem("access_token");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const raw = JSON.stringify({
        oldPassword : data.oldpassword,
        newPassword : data.newpassword
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("http://localhost:8080/api/v1/auth/change-password", requestOptions);
      const responseData = await response.json();

      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // save token to localStorage
        localStorage.setItem('access_token', responseData.access_token);
        localStorage.setItem('refresh_token', responseData.refresh_token);

        dispatch(counterSlice.actions.increase());
        data.setPasswordErrorMessage();
        data.setPasswordSuccessMessage(responseData.message || "Thành công");
        data.setEditting(false);
        data.setInputDefault();
      } else {
          data.setPasswordErrorMessage(responseData.message || "Có lỗi xảy ra!");
      }
      }catch(error){
        console.error(error);
      }
  }else{
    data.setPasswordErrorMessage("Mật khẩu không khớp");
  }
};

// Method refresh token
export const refreshToken = async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      console.log("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại");
    }else{
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${refreshToken}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:8080/api/v1/auth/refresh-token", requestOptions);
      const responseData = await response.json();
      if (response.ok) {
        //xóa token đã hết hạn
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        //set lại token mới
        localStorage.setItem("access_token", responseData.access_token);
        localStorage.setItem("refresh_token", responseData.refresh_token);
        dispatch(counterSlice.actions.increase());
      }else{
        console.log(responseData.message || "Có lỗi xảy ra!");
      }
    }
  } catch (error) {
    console.error(error);
  }
};
