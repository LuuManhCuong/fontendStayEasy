import { counterSlice } from "../reducer/counterSlice";


// Method login
export const login = (data) => (dispatch) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // create data
  const raw = JSON.stringify({
    email: data.username,
    password: data.password,
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
        // Kiểm tra nếu có thông tin trang trước đó, chuyển hướng lại đó sau khi đăng nhập thành công
        const from = data.location.state?.from?.pathname || '/'; data.navigate(from, { replace: true });
      }
    })
    .catch((error) => {
      data.setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
    });
};


// Method sign-up
export const signup = (data) => async (dispatch) => {
  try {
      if (!data.username || !data.password || !data.confirmPassword) {
        return data.setErrorMessage("Vui lòng nhập thông tin!");
      }

      if (!/\S+@\S+\.\S+/.test(data.username)) {
        return data.setErrorMessage("Email không hợp lệ!");
      }

      if (data.password !== data.confirmPassword) {
        return data.setErrorMessage("Mật khẩu không khớp!");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
          email: data.username,
          password: data.password,
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
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
        alert("Đăng xuất thất bại!");
      });
  } else {
    alert("Bạn chưa đăng nhập!");
  }
};


// Method check user login
export const checkLoginStatus = (setIsAuthenticated) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsAuthenticated(false);
    }else{
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch("http://localhost:8080/api/v1/auth/checkLogin", requestOptions)
        .then((response) => {
          if (response.ok) {
            console.log(response);
          } else {
            setIsAuthenticated(false);
            throw new Error('Not logged in');
        }})
        .then((result) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error(error)
          setIsAuthenticated(false);
        });
    }
  } catch (error) {
    console.error(error);
    setIsAuthenticated(false);
  }
};
