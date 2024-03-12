      // Danh sách các ngày lễ và tỷ lệ tăng giá áp dụng
      const holidays = [
        { date: '2024-04-30', increaseRate: 20 }, 
        { date: '2024-01-05', increaseRate: 25 }, 
        { date: '2024-06-01', increaseRate: 20 }, 
        { date: '2024-02-09', increaseRate: 20 }, 
        // Thêm các ngày lễ khác vào đây
    ];
  
  // Hàm kiểm tra một ngày có phải là ngày lễ và trả về tỷ lệ tăng giá
  function checkHolidayAndCalculateRate(date, pricePerNight) {
    const dateString = date.toISOString().split('T')[0];
    for (let holiday of holidays) {
      if (holiday.date === dateString) {
        return pricePerNight + (pricePerNight * holiday.increaseRate / 100);
      }
    }
    return pricePerNight;
  }
  
  // Hàm tính giá cho toàn bộ kỳ nghỉ dựa trên ngày bắt đầu và kết thúc
  function calculateHolidayPricing(startDate, endDate, pricePerNight) {
    let totalCost = 0;
    let currentDate = new Date(startDate);
    const checkOut = new Date(endDate);
    while (currentDate <= checkOut) {
      const adjustedPrice = checkHolidayAndCalculateRate(currentDate, pricePerNight);
      totalCost += adjustedPrice; // Cộng dồn giá đã điều chỉnh vào tổng giá
      currentDate.setDate(currentDate.getDate() + 1); // Chuyển sang ngày tiếp theo
    }
    console.log(totalCost);
    return totalCost;
  }
    function calculatePricing(checkin, checkout , place, numberNight) {
        // Kiểm tra xem đối tượng place có tồn tại hay không
        if (!place || numberNight <= 0) {
          return {
            price: 0,
            discount: 0,
            total: 0,
            serviceFeePercentage : 0,
          };
        }
      
        // Tính giá tiền trước giảm giá
        const price = calculateHolidayPricing(checkin , checkout, place.price);
        // Tính số tiền giảm giá
        const discount = place.discount ? price * (place.discount / 100) : 0;
        const serviceFeePercentage  = price * 0.15;
        // Tính tổng số tiền sau khi đã giảm giá
        const total = (price + serviceFeePercentage - discount).toFixed(2);
        
      
        // Trả về một đối tượng chứa các giá trị tính toán được
        return { price, discount, total , serviceFeePercentage};
      }

      // Export hàm để có thể sử dụng trong các file khác
module.exports = {
    calculatePricing
  };