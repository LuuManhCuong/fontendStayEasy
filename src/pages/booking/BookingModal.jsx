import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState(1);

  const closeModal = () => setIsOpen(true);
  return (
    !isOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto pb-20">
        <div className="flex items-end justify-center min-h-screen  pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all  sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-lg">Chỉnh sửa đặt phòng</span>
              <button onClick={closeModal}>&#10005;</button>
            </div>

            <DateRangePicker
              ranges={dateRange}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
            />

            <div className="mt-4">
              <label htmlFor="guests">Số lượng khách</label>

              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border mt-2 rounded px-3 py-2 bg-gray-100 text-gray-900"
              />
            </div>

            <div className="flex justify-center">
              <button className="bg-pink-600 text-white px-4 py-2 rounded mt-6 hover:bg-slate-950">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default BookingModal;