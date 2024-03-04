import { counterSlice } from "../redux-tookit/reducer/counterSlice";

//Method login
export const login = (data) => {
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
        // save information into localStorage
        localStorage.setItem("access_token", JSON.stringify(result.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(result.refresh_token));
        localStorage.setItem("user", JSON.stringify(result.user));

        data.dispatch(counterSlice.actions.increase());

        //set message to default
        data.setMessage("", "", "");
        
        if(data.setIsLogined){
          data.setIsLogined(true);
        }
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

//Method signup
export const signup = (data) => {
    if (!data.username == "" && !data.password == "" && !data.confirmPassword == "") {
        if (/\S+@\S+\.\S+/.test(data.username)) {
          if (data.password === data.confirmPassword) {
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
            fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
              .then((response) => {
                if (response.ok) {
                  return response.text();
                }
                throw Error(response.status);
              })
              .then((result) => {
                data.setMessage("","","Đăng kí thành công thành công. Mời bạn đăng nhập!");
                data.setIsSecondForm(false);
                data.setisLogin(true);
              })
              .catch((error) => {
                console.error("error", error);
                data.setErrorMessage("Email đã đăng ký!");
              }); 
        } else {
          data.setErrorMessage("Mật khẩu không khớp!");
        }
      } else {
        data.setErrorMessage("Email không hợp lệ!");
      }
    } else {
      data.setErrorMessage("Vui lòng nhập thông tin!");
    }
};