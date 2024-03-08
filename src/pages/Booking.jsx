import React, { useState, useEffect } from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import Footer from "../components/footer/Footer";
import { Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { GoStarFill } from "react-icons/go";
import { TiHeartFullOutline } from "react-icons/ti";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import BookingModal from './booking/BookingModal';

const Booking = () => {
    const [place, setPlace] = useState([]);
    const { id } = useParams();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('checkin');
    const checkOut = urlParams.get('checkout');
    const numGuest = urlParams.get('numGuest');
    const [redirect, setRedirect] = useState('');
    const numberNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    // show UI
    const [isOpenPayFunction, setIsOpenPayFunction] = useState(false);
    const [isOpenCountryModal, setIsOpenCountryModal] = useState(false);
    const [isOpenHouseRuleModal, setIsOpenHouseRuleModal] = useState(false);
    const [isOpenPolicyModal, setIsOpenPolicyModal] = useState(false);
    const [isOpenChargeForDamageModal, setIsOpenChargeForDamageModal] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpen1, setIsDialogOpen1] = useState(false);


    const currency = 'USD';
    const method = 'SALE';
    const intent = 'PAYPAL';
    const description = `${user.userName} Payment for booking ${place.propertyName}`

    const [selectedPayment, setSelectedPayment] = useState("Credit or debit card");

    const handlePaymentSelect = (paymentType) => {
        setSelectedPayment(paymentType);
        setIsOpenPayFunction(false);
    }
    const togglePopupCountry = () => {
        setIsOpenCountryModal(!isOpenCountryModal);
    };
    const handleOpenDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };
    const handleOpenEdit = () => {
        setIsOpenEdit(!isOpenEdit);
    };
    const handleOpenDialog1 = () => {
        setIsDialogOpen1(!isDialogOpen1);
    };
    const togglePopupHouseRule = () => {
        setIsOpenHouseRuleModal(!isOpenHouseRuleModal);
    };

    const togglePopupPolicy = () => {
        setIsOpenPolicyModal(!isOpenPolicyModal);
    };

    const togglePopupChargeForDamage = () => {
        setIsOpenChargeForDamageModal(!isOpenChargeForDamageModal);
    };
    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8080/api/v1/stayeasy/property/${id}`)
            .then(response => {
                if (response) {
                    setPlace(response.data);
                    console.log(response.data); // Logging response data instead of place
                }
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });
    }, [id]);
    const discount = place ? (place.price * numberNight * (place.discount / 100)) : 0;
  const total = place ? (place.price * numberNight - discount) : 0;
  const price = place ? (place.price * numberNight) : 0;

    async function bookThisPlace() {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/stayeasy/booking/create', {
                checkIn,
                checkOut,
                numGuest,
                numberNight,
                currency,
                method,
                intent,
                description,
                propertyId: id,
                userId: user.id,
                price: total,
                total: price,
            });

            // Lấy dữ liệu từ response
            const { data } = response;

            // Kiểm tra xem có approvalUrl trong response không
            if (data && data.approvalUrl) {
                // Redirect đến approvalUrl
                window.location.href = data.approvalUrl;
            } else {
                // Xử lý trường hợp không có approvalUrl
                console.error("Không tìm thấy approvalUrl.");
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Đã xảy ra lỗi:", error);
        }
    }

    return (
        <>
             <div className="flex items-center h-32 w-full pl-10 shadow-sm shadow-black">
                <svg width="102" height="32" color='#FF385C'>
                    <path
                        d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                        fill="currentcolor"></path>
                    <path
                        d="M41.6847 24.1196C40.8856 24.1196 40.1505 23.9594 39.4792 23.6391C38.808 23.3188 38.2327 22.8703 37.7212 22.2937C37.2098 21.7172 36.8263 21.0445 36.5386 20.3078C36.2509 19.539 36.123 18.7062 36.123 17.8093C36.123 16.9124 36.2829 16.0475 36.5705 15.2787C36.8582 14.51 37.2737 13.8373 37.7852 13.2287C38.2966 12.6521 38.9039 12.1716 39.6071 11.8513C40.3103 11.531 41.0455 11.3708 41.8765 11.3708C42.6756 11.3708 43.3788 11.531 44.0181 11.8833C44.6574 12.2037 45.1688 12.6841 45.5843 13.2927L45.6802 11.7232H48.6209V23.7992H45.6802L45.5843 22.0375C45.1688 22.6781 44.6254 23.1906 43.9222 23.575C43.2829 23.9274 42.5158 24.1196 41.6847 24.1196ZM42.4519 21.2367C43.0272 21.2367 43.5386 21.0765 44.0181 20.7882C44.4656 20.4679 44.8172 20.0515 45.1049 19.539C45.3606 19.0265 45.4884 18.4179 45.4884 17.7452C45.4884 17.0725 45.3606 16.4639 45.1049 15.9514C44.8492 15.4389 44.4656 15.0225 44.0181 14.7022C43.5706 14.3818 43.0272 14.2537 42.4519 14.2537C41.8765 14.2537 41.3651 14.4139 40.8856 14.7022C40.4382 15.0225 40.0866 15.4389 39.7989 15.9514C39.5432 16.4639 39.4153 17.0725 39.4153 17.7452C39.4153 18.4179 39.5432 19.0265 39.7989 19.539C40.0546 20.0515 40.4382 20.4679 40.8856 20.7882C41.3651 21.0765 41.8765 21.2367 42.4519 21.2367ZM53.6392 8.4559C53.6392 8.80825 53.5753 9.12858 53.4154 9.38483C53.2556 9.64109 53.0319 9.86531 52.7442 10.0255C52.4565 10.1856 52.1369 10.2497 51.8173 10.2497C51.4976 10.2497 51.178 10.1856 50.8903 10.0255C50.6026 9.86531 50.3789 9.64109 50.2191 9.38483C50.0592 9.09654 49.9953 8.80825 49.9953 8.4559C49.9953 8.10355 50.0592 7.78323 50.2191 7.52697C50.3789 7.23868 50.6026 7.04649 50.8903 6.88633C51.178 6.72617 51.4976 6.66211 51.8173 6.66211C52.1369 6.66211 52.4565 6.72617 52.7442 6.88633C53.0319 7.04649 53.2556 7.27072 53.4154 7.52697C53.5433 7.78323 53.6392 8.07152 53.6392 8.4559ZM50.2191 23.7672V11.6911H53.4154V23.7672H50.2191V23.7672ZM61.9498 14.8623V14.8943C61.79 14.8303 61.5982 14.7982 61.4383 14.7662C61.2466 14.7342 61.0867 14.7342 60.895 14.7342C60 14.7342 59.3287 14.9904 58.8812 15.535C58.4018 16.0795 58.178 16.8483 58.178 17.8413V23.7672H54.9817V11.6911H57.9223L58.0182 13.517C58.3379 12.8763 58.7214 12.3958 59.2648 12.0435C59.7762 11.6911 60.3835 11.531 61.0867 11.531C61.3105 11.531 61.5342 11.563 61.726 11.595C61.8219 11.6271 61.8858 11.6271 61.9498 11.6591V14.8623ZM63.2283 23.7672V6.72617H66.4247V13.2287C66.8722 12.6521 67.3836 12.2036 68.0229 11.8513C68.6622 11.531 69.3654 11.3388 70.1645 11.3388C70.9635 11.3388 71.6987 11.4989 72.3699 11.8193C73.0412 12.1396 73.6165 12.588 74.128 13.1646C74.6394 13.7412 75.0229 14.4139 75.3106 15.1506C75.5983 15.9194 75.7261 16.7522 75.7261 17.6491C75.7261 18.546 75.5663 19.4109 75.2787 20.1796C74.991 20.9484 74.5755 21.6211 74.064 22.2297C73.5526 22.8063 72.9453 23.2867 72.2421 23.6071C71.5389 23.9274 70.8037 24.0875 69.9727 24.0875C69.1736 24.0875 68.4704 23.9274 67.8311 23.575C67.1918 23.2547 66.6804 22.7742 66.2649 22.1656L66.169 23.7352L63.2283 23.7672ZM69.3973 21.2367C69.9727 21.2367 70.4841 21.0765 70.9635 20.7882C71.411 20.4679 71.7626 20.0515 72.0503 19.539C72.306 19.0265 72.4339 18.4179 72.4339 17.7452C72.4339 17.0725 72.306 16.4639 72.0503 15.9514C71.7626 15.4389 71.411 15.0225 70.9635 14.7022C70.5161 14.3818 69.9727 14.2537 69.3973 14.2537C68.822 14.2537 68.3106 14.4139 67.8311 14.7022C67.3836 15.0225 67.032 15.4389 66.7443 15.9514C66.4886 16.4639 66.3608 17.0725 66.3608 17.7452C66.3608 18.4179 66.4886 19.0265 66.7443 19.539C67 20.0515 67.3836 20.4679 67.8311 20.7882C68.3106 21.0765 68.822 21.2367 69.3973 21.2367ZM76.9408 23.7672V11.6911H79.8814L79.9773 13.2607C80.3289 12.6841 80.8084 12.2357 81.4157 11.8833C82.023 11.531 82.7262 11.3708 83.5253 11.3708C84.4203 11.3708 85.1874 11.595 85.8267 12.0115C86.4979 12.4279 87.0094 13.0365 87.361 13.8053C87.7126 14.574 87.9043 15.5029 87.9043 16.56V23.7992H84.708V16.9764C84.708 16.1436 84.5162 15.4709 84.1326 14.9904C83.7491 14.51 83.2376 14.2537 82.5664 14.2537C82.0869 14.2537 81.6714 14.3498 81.2878 14.574C80.9362 14.7982 80.6486 15.0865 80.4248 15.503C80.2011 15.8873 80.1052 16.3678 80.1052 16.8483V23.7672H76.9408V23.7672ZM89.5025 23.7672V6.72617H92.6989V13.2287C93.1464 12.6521 93.6578 12.2036 94.2971 11.8513C94.9364 11.531 95.6396 11.3388 96.4387 11.3388C97.2378 11.3388 97.9729 11.4989 98.6442 11.8193C99.3154 12.1396 99.8907 12.588 100.402 13.1646C100.914 13.7412 101.297 14.4139 101.585 15.1506C101.873 15.9194 102 16.7522 102 17.6491C102 18.546 101.841 19.4109 101.553 20.1796C101.265 20.9484 100.85 21.6211 100.338 22.2297C99.8268 22.8063 99.2195 23.2867 98.5163 23.6071C97.8131 23.9274 97.0779 24.0875 96.2469 24.0875C95.4478 24.0875 94.7446 23.9274 94.1053 23.575C93.466 23.2547 92.9546 22.7742 92.5391 22.1656L92.4432 23.7352L89.5025 23.7672ZM95.7035 21.2367C96.2788 21.2367 96.7903 21.0765 97.2697 20.7882C97.7172 20.4679 98.0688 20.0515 98.3565 19.539C98.6122 19.0265 98.7401 18.4179 98.7401 17.7452C98.7401 17.0725 98.6122 16.4639 98.3565 15.9514C98.1008 15.4389 97.7172 15.0225 97.2697 14.7022C96.8222 14.3818 96.2788 14.2537 95.7035 14.2537C95.1281 14.2537 94.6167 14.4139 94.1373 14.7022C93.6898 15.0225 93.3382 15.4389 93.0505 15.9514C92.7628 16.4639 92.6669 17.0725 92.6669 17.7452C92.6669 18.4179 92.7948 19.0265 93.0505 19.539C93.3062 20.0515 93.6898 20.4679 94.1373 20.7882C94.6167 21.0765 95.0962 21.2367 95.7035 21.2367Z"
                        fill="currentcolor"></path>
                </svg>
            </div>
        
            { place ? (<div className='flex justify-between'>
                {/* Left content */}
               <div className='pl-64 pt-28 max-w-[53%]'>
                    <div className='flex flex-col'>
                        <div className='flex items-center'>
                            <a href={`/explore/detail/${id}`} className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 320 512">
                                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                                </svg>
                                <h1 className='px-10 pl-6'>Xác nhận và thanh toán</h1>
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col px-16 py-16'>
                        {/* box */}
                        <div className='w-full px-10 py-6 rounded-3xl border border-black flex justify-between items-center'>
                            <div>
                                <p className='font-bold'>Địa điểm có rating cao.</p>
                                <p>Địa điểm của {place.owner?.lastName} thường được đặt trước.</p>
                            </div>
                            <div className=''>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
                                    <path fill="#ff385c" d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.5 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z" />
                                </svg>
                            </div>
                        </div>

                        {/* Your Trip */}
                        <div className='w-full my-10'>
                            <h2 className='text-4xl'>Chuyến đi của bạn</h2>
                            <div className='flex justify-between items-center mt-10'>
                                <p className='font-medium text-3xl'>Ngày</p>
                                <button className='underline font-medium' onClick={handleOpenEdit}>Sửa</button>
                            </div>
                            <span> {format(new Date(checkIn), 'MM-dd')} Đến {format(new Date(checkOut), 'MM-dd')} </span>
                            <div className='flex justify-between items-center mt-10'>
                                <p className='font-medium text-3xl'>Số khách</p>
                                <a><span className='underline font-medium'>Sửa</span></a>
                            </div>
                            <span>{numGuest} khách</span>
                            {isOpenEdit && <BookingModal propertyId={id} isOpen={true} onClose={handleOpenEdit} />}
                            <hr className='my-5' />

                        </div>


                        {/* Pay with */}
                        <div className='w-full'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-4xl'>Thanh toán với</h2>
                                <div className='flex items-center gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                                        <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2 .3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4 .2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2 .2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2 .1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                                        <path d="M520.4 196.1c0-7.9-5.5-12.1-15.6-12.1h-4.9v24.9h4.7c10.3 0 15.8-4.4 15.8-12.8zM528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-44.1 138.9c22.6 0 52.9-4.1 52.9 24.4 0 12.6-6.6 20.7-18.7 23.2l25.8 34.4h-19.6l-22.2-32.8h-2.2v32.8h-16zm-55.9 .1h45.3v14H444v18.2h28.3V217H444v22.2h29.3V253H428zm-68.7 0l21.9 55.2 22.2-55.2h17.5l-35.5 84.2h-8.6l-35-84.2zm-55.9-3c24.7 0 44.6 20 44.6 44.6 0 24.7-20 44.6-44.6 44.6-24.7 0-44.6-20-44.6-44.6 0-24.7 20-44.6 44.6-44.6zm-49.3 6.1v19c-20.1-20.1-46.8-4.7-46.8 19 0 25 27.5 38.5 46.8 19.2v19c-29.7 14.3-63.3-5.7-63.3-38.2 0-31.2 33.1-53 63.3-38zm-97.2 66.3c11.4 0 22.4-15.3-3.3-24.4-15-5.5-20.2-11.4-20.2-22.7 0-23.2 30.6-31.4 49.7-14.3l-8.4 10.8c-10.4-11.6-24.9-6.2-24.9 2.5 0 4.4 2.7 6.9 12.3 10.3 18.2 6.6 23.6 12.5 23.6 25.6 0 29.5-38.8 37.4-56.6 11.3l10.3-9.9c3.7 7.1 9.9 10.8 17.5 10.8zM55.4 253H32v-82h23.4c26.1 0 44.1 17 44.1 41.1 0 18.5-13.2 40.9-44.1 40.9zm67.5 0h-16v-82h16zM544 433c0 8.2-6.8 15-15 15H128c189.6-35.6 382.7-139.2 416-160zM74.1 191.6c-5.2-4.9-11.6-6.6-21.9-6.6H48v54.2h4.2c10.3 0 17-2 21.9-6.4 5.7-5.2 8.9-12.8 8.9-20.7s-3.2-15.5-8.9-20.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                                        <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3 .5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5 .1-9.8-6.9-15.5-16.2-15.5z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
                                        <path d="M105.7 215v41.3h57.1a49.7 49.7 0 0 1 -21.1 32.6c-9.5 6.6-21.7 10.3-36 10.3-27.6 0-50.9-18.9-59.3-44.2a65.6 65.6 0 0 1 0-41l0 0c8.4-25.5 31.7-44.4 59.3-44.4a56.4 56.4 0 0 1 40.5 16.1L176.5 155a101.2 101.2 0 0 0 -70.8-27.8 105.6 105.6 0 0 0 -94.4 59.1 107.6 107.6 0 0 0 0 96.2v.2a105.4 105.4 0 0 0 94.4 59c28.5 0 52.6-9.5 70-25.9 20-18.6 31.4-46.2 31.4-78.9A133.8 133.8 0 0 0 205.4 215zm389.4-4c-10.1-9.4-23.9-14.1-41.4-14.1-22.5 0-39.3 8.3-50.5 24.9l20.9 13.3q11.5-17 31.3-17a34.1 34.1 0 0 1 22.8 8.8A28.1 28.1 0 0 1 487.8 248v5.5c-9.1-5.1-20.6-7.8-34.6-7.8-16.4 0-29.7 3.9-39.5 11.8s-14.8 18.3-14.8 31.6a39.7 39.7 0 0 0 13.9 31.3c9.3 8.3 21 12.5 34.8 12.5 16.3 0 29.2-7.3 39-21.9h1v17.7h22.6V250C510.3 233.5 505.3 220.3 495.1 211zM475.9 300.3a37.3 37.3 0 0 1 -26.6 11.2A28.6 28.6 0 0 1 431 305.2a19.4 19.4 0 0 1 -7.8-15.6c0-7 3.2-12.8 9.5-17.4s14.5-7 24.1-7C470 265 480.3 268 487.6 273.9 487.6 284.1 483.7 292.9 475.9 300.3zm-93.7-142A55.7 55.7 0 0 0 341.7 142H279.1V328.7H302.7V253.1h39c16 0 29.5-5.4 40.5-15.9 .9-.9 1.8-1.8 2.7-2.7A54.5 54.5 0 0 0 382.3 158.3zm-16.6 62.2a30.7 30.7 0 0 1 -23.3 9.7H302.7V165h39.6a32 32 0 0 1 22.6 9.2A33.2 33.2 0 0 1 365.7 220.5zM614.3 201 577.8 292.7h-.5L539.9 201H514.2L566 320.6l-29.4 64.3H561L640 201z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Dropdown */}
                            <div className='flex justify-between items-center mt-10'>
                                <div className='relative flex flex-col items-center w-full h-fit rounded-xl '>
                                    <button onClick={() => setIsOpenPayFunction((prev) => !prev)} className='p-3 w-full flex items-center justify-between text-2xl text-gray-600 rounded-lg tracking-wider border border-black active:border-black duration-300'>
                                        <div className='flex items-center gap-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width='35' height='35'>
                                                <rect width="256" height="256" fill="none" />
                                                <rect x="24" y="56" width="208" height="144" rx="8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                <line x1="168" y1="168" x2="200" y2="168" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                <line x1="120" y1="168" x2="136" y2="168" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                <line x1="24" y1="96.9" x2="232" y2="96.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                            </svg>
                                            {selectedPayment}
                                        </div>
                                        {!isOpenPayFunction ? (
                                            <AiOutlineCaretDown className='h-11'></AiOutlineCaretDown>
                                        ) : (
                                            <AiOutlineCaretUp className='h-11'></AiOutlineCaretUp>
                                        )}
                                    </button>

                                    {isOpenPayFunction &&
                                        <div className='bg-white absolute top-20 flex flex-col items-start rounded-lg mt-[15px] w-full border border-black'>
                                            <div className='flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent'>
                                                <button
                                                    className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                                                    onClick={() => handlePaymentSelect('Credit or debit card')}>
                                                    <div className=''>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width='35' height='35'>
                                                            <rect width="256" height="256" fill="none" />
                                                            <rect x="24" y="56" width="208" height="144" rx="8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                            <line x1="168" y1="168" x2="200" y2="168" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                            <line x1="120" y1="168" x2="136" y2="168" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                            <line x1="24" y1="96.9" x2="232" y2="96.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" />
                                                        </svg>
                                                    </div>
                                                    Credit or debit card
                                                </button>
                                            </div>
                                            <div className='flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent'>
                                                <button
                                                    className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                                                    onClick={() => handlePaymentSelect('PayPal')}>
                                                    <div className=''>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width='35' height='35' viewBox="0 0 576 512">
                                                            <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3 .5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5 .1-9.8-6.9-15.5-16.2-15.5z" />
                                                        </svg>
                                                    </div>
                                                    Pay Pal
                                                </button>
                                            </div>
                                            <div className='flex w-full p-3 text-2xl text-gray-600 justify-between hover:bg-gray-100 cursor-pointer rounded-r-lg border-l-transparent'>
                                                <button
                                                    className="flex items-center gap-3 p-3 text-2xl text-gray-600 hover:bg-gray-100 cursor-pointer rounded-lg border-l-transparent w-full"
                                                    onClick={() => handlePaymentSelect('Google Pay')}>
                                                    <div className=''>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width='35' height='35' viewBox="0 0 640 512">
                                                            <path d="M105.7 215v41.3h57.1a49.7 49.7 0 0 1 -21.1 32.6c-9.5 6.6-21.7 10.3-36 10.3-27.6 0-50.9-18.9-59.3-44.2a65.6 65.6 0 0 1 0-41l0 0c8.4-25.5 31.7-44.4 59.3-44.4a56.4 56.4 0 0 1 40.5 16.1L176.5 155a101.2 101.2 0 0 0 -70.8-27.8 105.6 105.6 0 0 0 -94.4 59.1 107.6 107.6 0 0 0 0 96.2v.2a105.4 105.4 0 0 0 94.4 59c28.5 0 52.6-9.5 70-25.9 20-18.6 31.4-46.2 31.4-78.9A133.8 133.8 0 0 0 205.4 215zm389.4-4c-10.1-9.4-23.9-14.1-41.4-14.1-22.5 0-39.3 8.3-50.5 24.9l20.9 13.3q11.5-17 31.3-17a34.1 34.1 0 0 1 22.8 8.8A28.1 28.1 0 0 1 487.8 248v5.5c-9.1-5.1-20.6-7.8-34.6-7.8-16.4 0-29.7 3.9-39.5 11.8s-14.8 18.3-14.8 31.6a39.7 39.7 0 0 0 13.9 31.3c9.3 8.3 21 12.5 34.8 12.5 16.3 0 29.2-7.3 39-21.9h1v17.7h22.6V250C510.3 233.5 505.3 220.3 495.1 211zM475.9 300.3a37.3 37.3 0 0 1 -26.6 11.2A28.6 28.6 0 0 1 431 305.2a19.4 19.4 0 0 1 -7.8-15.6c0-7 3.2-12.8 9.5-17.4s14.5-7 24.1-7C470 265 480.3 268 487.6 273.9 487.6 284.1 483.7 292.9 475.9 300.3zm-93.7-142A55.7 55.7 0 0 0 341.7 142H279.1V328.7H302.7V253.1h39c16 0 29.5-5.4 40.5-15.9 .9-.9 1.8-1.8 2.7-2.7A54.5 54.5 0 0 0 382.3 158.3zm-16.6 62.2a30.7 30.7 0 0 1 -23.3 9.7H302.7V165h39.6a32 32 0 0 1 22.6 9.2A33.2 33.2 0 0 1 365.7 220.5zM614.3 201 577.8 292.7h-.5L539.9 201H514.2L566 320.6l-29.4 64.3H561L640 201z" />
                                                        </svg>                                                        
                                                    </div>
                                                    Google Pay
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {selectedPayment === 'Credit or debit card' && (
                                <div className="mt-4">
                                    <input
                                        className='w-full p-4 border border-black text-2xl rounded-t-lg placeholder-gray-600'
                                        placeholder='Card number'
                                    />
                                    <div className='flex items-center'>
                                        <input
                                            className='w-full p-4 border border-black text-2xl rounded-bl-lg placeholder-gray-600'
                                            placeholder='Expiration'
                                        />
                                        <input
                                            className='w-full p-4 border border-black text-2xl rounded-br-lg placeholder-gray-600'
                                            placeholder='CVV'
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <input
                                            className='w-full p-4 border border-black text-2xl rounded-lg placeholder-gray-600'
                                            placeholder='Zip code'
                                        />
                                    </div>
                                    <button
                                        className='w-full p-3 mt-4 border border-black rounded-lg flex justify-between items-center'
                                        onClick={togglePopupCountry}
                                    >
                                        <div className='flex flex-col items-start'>
                                            <span className='font-thin text-xl'>Country/region</span>
                                            <span className='text-2xl'>Vietnam</span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='20' height='20'>
                                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                        </svg>
                                    </button>
                                    <hr className='my-5' />
                                </div>
                            )}

                            {selectedPayment && selectedPayment == 'Paypal' && (
                                <div className="mt-4">
                                    <span>Selected payment method: {selectedPayment}</span>
                                </div>
                            )}
                        </div>


                        {/* Required for your trip */}
                        <div className='w-full'>
                            <h2 className='text-4xl'>Cần thiết cho chuyến đi</h2>
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col mt-5'>
                                    <h4>Số điện thoại</h4>
                                    <p>Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập nhật về chuyến đi.</p>
                                </div>
                                <button className='w-24 h-14 border border-black rounded-xl font-medium'>Add</button>
                            </div>
                            <hr className='my-5' />
                        </div>
                        {/* Cancellation policy */}
                        <div className='w-full'>
                            <h2 className='text-4xl'>Chính sách hủy</h2>
                            <div className='flex flex-col mt-5'>
                                <p>
                                    <span className='font-bold'>Hủy miễn phí trước ngày {format(new Date(checkIn), 'dd') - 2} tháng {format(new Date(checkIn), 'MM')} . </span>
                                    Hủy trước khi nhận phòng vào ngày {format(new Date(checkIn), 'dd')} tháng {format(new Date(checkIn), 'MM')}  để được hoàn lại một phần.
                                    <span className='font-medium underline ml-1'>Tìm hiểu thêm</span>
                                </p>
                            </div>
                            <hr className='my-5' />
                        </div>

                        {/* Ground rules */}
                        <div className='w-full'>
                            <h2 className='text-4xl'>Quy tắc thuê</h2>
                            <div className='flex flex-col mt-5'>
                                <p>Chúng tôi mong mỗi vị khách hãy ghi nhớ một số điều đơn giản để tạo nên một vị khách tuyệt vời.</p>
                                <ul>
                                    <li>● Tuân theo nguyên tắc của chủ nhà</li>
                                    <li>● Hãy xem đây như nhà của  bạn</li>
                                </ul>
                            </div>
                            <hr className='my-5' />
                        </div>

                        {/* policy */}
                        <div className='w-full'>
                            <div className='text-lg'>
                                <p>Bằng cách chọn nút bên dưới, tôi đồng ý với
                                    <button onClick={togglePopupHouseRule} className='font-medium underline ml-1'>Quy tắc thuê</button>,
                                    <button className='font-medium underline ml-1'>Nội quy khách thuê</button>,
                                    <button onClick={togglePopupPolicy} className='font-medium underline ml-1'>Chính sách dịch vụ và hủy của Airbnb</button>,
                                    và Airbnb có thể
                                    <button onClick={togglePopupChargeForDamage} className='font-medium underline ml-1 mr-1'>tính phí vào phương thức thanh toán</button>
                                    của tôi nếu tôi gây thiệt hại.</p>
                            </div>

                        </div>

                        {/* button confirm */}
                        <div className="max-w-[40%] my-5">
                            <button onClick={() => bookThisPlace()} type="submit"
                                className="bg-[#da0964] hover:bg-[#FF002C] transition duration-1000 text-white text-3xl font-bold py-4 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"> Xác nhận đặt
                                {numberNight > 0 && (
                                    <span>  ${total}</span>
                                )}
                            </button>
                        </div>

                        {/* modal start */}
                        {isOpenCountryModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                                <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={togglePopupCountry}>
                                </div>

                                {/* header area start */}
                                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
                                    <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                                        <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={togglePopupCountry}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </button>
                                        <h2 className="text-3xl justify-center text-center font-semibold">
                                            Country/region
                                        </h2>
                                    </div>

                                    <hr />

                                    {/* body area start */}
                                    <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* modal House rules */}
                        {isOpenHouseRuleModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                                <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={togglePopupHouseRule}>
                                </div>
                                {/* header area start */}
                                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[90%]">
                                    <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                                        <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={togglePopupHouseRule}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* body area start */}
                                    <div className="px-10 py-4 overflow-auto max-h-[88%] z-50 mt-16">
                                        <h2 className="text-5xl font-semibold">House rules</h2>
                                        <p className='text-3xl my-5'>You’ll be staying in someone’s home, so please treat it with care and respect.</p>
                                        <h4 className='text-3xl my-5'>Checking in and out</h4>

                                        <div className='flex justify-start items-center mt-5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512">
                                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                            </svg>
                                            <p className='text-3xl mt-3 ml-7'>Check-in after 2:00 PM</p>
                                        </div>
                                        <hr />
                                        <div className='flex justify-start items-center mt-4 mb-10'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512">
                                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                                            </svg>
                                            <p className='text-3xl mt-3 ml-7'>Checkout before 12:00 PM</p>
                                        </div>

                                        <h4 className='text-3xl my-8'>During your stay</h4>
                                        <div className='flex items-center mt-5'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
                                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                                            </svg>
                                            <p className='text-3xl mt-3 ml-7'>3 guests maximum</p>
                                        </div>
                                        <hr />
                                        <div className='flex items-center mt-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512">
                                                <path d="M448 32V43c0 38.2 15.2 74.8 42.2 101.8l21 21c21 21 32.8 49.5 32.8 79.2v11c0 17.7-14.3 32-32 32s-32-14.3-32-32V245c0-12.7-5.1-24.9-14.1-33.9l-21-21C405.9 151.1 384 98.1 384 43V32c0-17.7 14.3-32 32-32s32 14.3 32 32zM576 256V245c0-38.2-15.2-74.8-42.2-101.8l-21-21c-21-21-32.8-49.5-32.8-79.2V32c0-17.7 14.3-32 32-32s32 14.3 32 32V43c0 12.7 5.1 24.9 14.1 33.9l21 21c39 39 60.9 91.9 60.9 147.1v11c0 17.7-14.3 32-32 32s-32-14.3-32-32zM0 416c0-35.3 28.7-64 64-64H416c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H64c-35.3 0-64-28.7-64-64V416zm224 0v32H384V416H224zm288-64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32zm96 0c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32z" />
                                            </svg>
                                            <p className='text-3xl mt-3 ml-7'>Smoking is allowed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* modal Rebooking and Refund Policy */}
                        {isOpenPolicyModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                                <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={togglePopupPolicy}>
                                </div>

                                {/* header area start */}
                                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[53%]">
                                    <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                                        <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={togglePopupPolicy}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </button>
                                        <h2 className="text-2xl justify-center text-center font-semibold">
                                            Rebooking and Refund Policy
                                        </h2>
                                    </div>

                                    <hr />

                                    {/* body area start */}
                                    <div className="px-10 py-4 overflow-auto max-h-[88%] z-50 text-2xl">
                                        <p>If a Host cancels your reservation prior to check-in, you will automatically receive a full refund. If a Host cancels 30 days or less prior to check-in, and you contact us, we will also assist you with finding comparable or better accommodations. </p>
                                        <p>Other Travel Issues must be reported to us no later than 72 hours after discovery. If we determine that a Travel Issue has disrupted the stay, we will provide a full or partial refund and, depending on the circumstances, may assist the guest with finding comparable or better accommodations. The amount of any refund will depend on the severity of the Travel Issue, the impact on you, the portion of the stay affected, and whether you remain at the accommodations.</p>
                                        <a href="#" className='font-medium'><p className='underline'>Read the full terms</p></a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* modal Getting charged for damage */}
                        {isOpenChargeForDamageModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
                                <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={togglePopupChargeForDamage}>
                                </div>

                                {/* header area start */}
                                <div className="bg-white rounded-2xl shadow-lg z-50 max-w-[37%] w-full h-[65%]">
                                    <div className="font-bold rounded-t-lg w-full pb-2 pt-8 px-10">
                                        <button className="absolute -mr-2 text-gray-500 hover:text-gray-700" onClick={togglePopupChargeForDamage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </button>
                                        <h2 className="text-3xl justify-center text-center font-semibold">
                                            Getting charged for damage
                                        </h2>
                                    </div>

                                    <hr />

                                    {/* body area start */}
                                    <div className="px-10 py-4 overflow-auto max-h-[88%] z-50">
                                        <p>Accidents are rare, but they happen. If you, someone you invite, or a pet are responsible for damage during a stay, your payment method may be charged.</p>

                                        <h3>What can I be charged for?</h3>
                                        <p>You could be charged for damage, any of your Host’s stuff that goes missing, or unexpected cleaning costs due to your stay.</p>

                                        <h3>What’s the process?</h3>
                                        <p>If you and your Host can’t work it out first, we’ll step in to determine responsibility. We’ll only charge your payment method if we have reason to believe you’re responsible.</p>

                                        <h3>What if I don’t agree?</h3>
                                        <p>You’ll have a chance to appeal if you think we made a mistake.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            
                {/* Right content */}
                <div>
                    <div className='fixed top-[23.5rem] left-[85rem] w-[32%] p-5 rounded-3xl border border-black'>
                        {/* top content */}
                        <div className='flex items-center justify-between mb-5'>
                            <img className='rounded-xl mr-5' width="150" height="150" src={place.thumbnail} />
                            <div class="mb-4">
                                <h4 class="text- font-semibold">{place.propertyName}</h4>
                                <p class="text-gray-600">{place.address}</p>
                                <div class="flex items-center mt-2">
                                    <GoStarFill />
                                    <span class="text-black-900 mr-1">{place.rating}</span>
                                    <span class="text-gray-900 ml-1">({place.feedbackList ?? 106} reviews)</span>
                                    <TiHeartFullOutline />
                                    <span class="ml-2 text-gray-900">Superhost</span>
                                </div>
                            </div>

                        </div>

                        {/* center content */}
                        <div className='mt-5'>
                            <h2 className='text-4xl'>Chi tiết giá</h2>
                            <div className='flex justify-between items-center'>
                                <p>${place.price} x {numberNight} đêm</p>
                                <p>${place.price * numberNight}</p>
                            </div>
                            {/* Khuyen mai */}
                            <div className='flex justify-between items-center'>
                                <a className='underline underline-offset-4 text-black ' onClick={handleOpenDialog}>Khuyến mãi</a>
                                {isDialogOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-25 z50">
                                        <div className="bg-white p-8 rounded-lg drop-shadow-xl">
                                            <button onClick={handleOpenDialog} className="mt-4 px-4 py-2 text-black hover:bg-zinc-100 hover:rounded-full rounded-md">X</button>
                                            <p className="text-xl">{`Khoản phí một lần do chủ nhà tính`}</p>
                                            <p className="text-xl">{`để trang trải chi phí vệ sinh chỗ của họ.`}</p>

                                        </div>
                                    </div>)}
                                <p>${discount}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <a className='underline underline-offset-4 text-black ' onClick={handleOpenDialog1}>Phí dịch vụ Airbnb</a>
                                {isDialogOpen1 && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-25 z10">
                                        <div className="bg-white p-8 rounded-lg drop-shadow-xl">
                                            <button onClick={handleOpenDialog1} className="mt-4 px-4 py-2 text-black hover:bg-zinc-100 hover:rounded-full rounded-md">X</button>
                                            <p className="text-xl">{`Điều này giúp chúng tôi vận hành nền tảng của mình và .`}</p>
                                            <p className="text-xl" >cung cấp các dịch vụ như hỗ trợ 24/7 trong chuyến đi của bạn</p>
                                            <p className="text-xl" > Số tiền này đã bao gồm thuế GTGT.</p>
                                        </div>
                                    </div>)}
                                <p>${discount}</p>
                            </div>
                        </div>
                        <hr />
                        {/* bot content */}
                        <div className='mt-5'>
                            <div className='flex justify-between items-center font-bold'>
                                <p>Tổng <span className='underline'>(USD)</span></p>
                                <p>${total}</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            ): (<div>Loadingg....</div>)} : 
            <Footer></Footer>
        </>
    )

}
export default Booking;
