import { counterSlice } from "../reducer/counterSlice";
import { Alert } from "../../components/Alert/Alert";


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
      data.setErrorLoginMessage("");
      
      if(data.toggleClosePopup){
        //Đóng Popup
        data.toggleClosePopup();
      }
      if(data.location){
        // const search = data.location.state?.search || '';
        // Kiểm tra nếu có thông tin trang trước đó, chuyển hướng lại đó sau khi đăng nhập thành công
        const from = data.location.state?.from?.pathname || '/'; data.navigate(from, { replace: true });
      }
      //Show thông báo
      Alert(1500, 'Đăng nhập', 'Đăng nhập thành công','success', 'OK');
    })
    .catch((error) => {
      data.setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
    });
};


// Method sign-up
export const signup = (data) => async (dispatch) => {
  try {
      if (!data.registerPassword || !data.confirmPassword ||
          !data.firstName || !data.lastName) {
        return data.setErrorRegisterMessage("Vui lòng nhập thông tin!");
      }

      if (data.registerPassword !== data.confirmPassword) {
        return data.setErrorRegisterMessage("Mật khẩu không khớp!");
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
          data.setErrorRegisterMessage("");
          data.setIsVerify(false);
          data.setIsLogin(true);
          //Show thông báo
          Alert(1500, 'Đăng ký', 'Đăng kí thành công thành công. Mời bạn đăng nhập!','success', 'OK');
      } else {
        //Show thông báo
        Alert(1500, 'Đăng ký', responseData.message || 'Có lỗi xảy ra!' ,'error', 'OK');
      }
  } catch (error) {
    //Show thông báo
    Alert(1500, 'Đăng ký', error.message || 'Có lỗi xảy ra khi đăng ký!' ,'error', 'OK');
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
        Alert(1500, 'Đăng xuất', 'Đăng xuất thành công' ,'success', 'OK');
      })
      .catch((error) => {
        console.error(error);
        Alert(1500, 'Đăng xuất', 'Đăng xuất thất bại' ,'error', 'OK');
      });
  } else {
    Alert(2000, 'Đăng xuất', 'Bạn chưa đăng nhập!' ,'warning', 'OK');
  }
};

// Method changePass
export const changePassword = (data) => async (dispatch) => {
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
      data.setEditting(false);
      data.setInputDefault();
      Alert(1500, 'Đổi mật khẩu', responseData.message || "Thành công" ,'success', 'OK');
    } else {
        data.setPasswordErrorMessage(responseData.message || "Có lỗi xảy ra!");
    }
    }catch(error){
      Alert(2000, 'Đổi mật khẩu', error.message || "Thất bại" ,'error', 'OK');
  }
};

// Method refresh token
export const refreshToken = async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      Alert(2000, 'Thông báo', 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại', 'warning', 'OK');
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
        //xóa token đã hết hạn
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        dispatch(counterSlice.actions.increase());
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// Method sen phone code
export const verifyPhone = ( data, setIsSendCode, setCodeErrorMessage ) => async (dispatch) =>{
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "App b3f0b48fc1f9f190b0450618894e6bc2-1fbd37c5-dc8c-4730-93d2-70b682dc527b");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const raw = JSON.stringify({
    "messages": [
      {
          "destinations": [{"to":"84342531726"}, {"to": `${data.phone}`}],
          "from": "StayEasy",
          "text": `Your verification PIN is: ${data.code}`
      }
    ]
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  const response = await fetch("https://y3ep3j.api.infobip.com/sms/2/text/advanced", requestOptions);
  const responseData = await response.json();
  if(response.ok){
    setIsSendCode(true);
  }else{
    setIsSendCode(false);
    setCodeErrorMessage("Không gửi được code. vui lòng thử lại!");
  }
};


// Method send email code
export const sendEmailCode = ( data ) => async(dispatch) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "code": data.code,
    "email": data.email
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8080/api/v1/auth/verify-email", requestOptions);
  const responseData = await response.json();
  if(response.ok){
    data.setCountdown(60);
    data.setCodeEmailError();
    data.setErrorRegisterMessage();
    data.setIsSendCode(true);
    data.setCodeEmailSuccess(responseData.message);
  }else if(response.status === 400){
    data.setCodeEmailSuccess();
    data.setErrorRegisterMessage();
    data.setIsSendCode(false);
    data.setCodeEmailError(responseData.message || "Không gửi được code")
  }else{
    data.setCodeEmailSuccess();
    data.setErrorRegisterMessage();
    data.setIsSendCode(false);
    data.setCodeEmailError("Không gửi được code. vui lòng thử lại!");
  }
};