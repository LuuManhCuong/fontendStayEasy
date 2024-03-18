import Swal from 'sweetalert2'

export const Alert = (timer, title, message, icon, confirmButtonText) => {
  Swal.fire({
      timer: timer, //1500
      title: title, //'Đăng nhập'
      text: message, //'Thành công'
      icon: icon, //'success' or 'error' or 'warning'
      confirmButtonText: confirmButtonText //'OK'
    })
}