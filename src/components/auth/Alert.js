import { createPortal } from 'react-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const Alert = () => {
  const [swalShown, setSwalShown] = useState(false)

  const showSwal = () => {
    Swal.fire({
        timer: 1500,
        title: 'OK!',
        text: 'Đăng nhập thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }

  return (
    <>
      <button onClick={showSwal}>Show SweetAlert2 modal</button>
      {/* Use createPortal to use the same state between your app and SweetAlert2 */}
      {swalShown &&
        createPortal(
          <Link to="/about" onClick={() => Swal.close()}>
            Go to About
          </Link>
        )}
    </>
  )
}