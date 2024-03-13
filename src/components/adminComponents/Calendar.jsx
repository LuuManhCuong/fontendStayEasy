import React, { useEffect } from "react";
import "./common.scss";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";

function Calendar({ propertyId }) {
  console.log("id: ", propertyId);
  const [data, setData] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (propertyId) {
      axios
        .get(
          `http://localhost:8080/api/v1/stayeasy/admin/booking?propertyId=${propertyId}`
        )
        .then(function (response) {
          // console.log("data: ", response.data);
          setData(response.data);
          setState([]);
          response.data?.map((booking, index) => {
            let select = {
              startDate: new Date(booking.checkIn),
              endDate: new Date(booking.checkOut),
              key: `selection${index + 1}`,
              defaultDate: booking.checkIn + " " + booking.checkOut,
              autoFocus: false, // Đây là giá trị mặc định, bạn có thể điều chỉnh nếu cần
            };

            setState((prev) => [...prev, select]);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [propertyId]);

  console.log("state: ", state);
  return (
    <>
      {state?.length > 0 ? (
        <div className="calendar shadow-lg m-8 rounded-lg">
          <DateRangePicker
            startDatePlaceholder="checkin"
            onChange={(item) => setState(item)}
            months={2}
            ranges={state}
          />
        </div>
      ) : (
        <h3> đang tải</h3>
      )}
    </>
  );
}

export default Calendar;
