// CommentForm.js

import React, { useState, useEffect, useRef } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import "./comment.scss";
import { grouptSlice } from "../../redux-tookit/reducer/grouptSlice";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "../../redux-tookit/selector";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value?.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  console.log(name);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
  };
}

const CommentForm = ({ propertyId }) => {
  const dispatch = useDispatch();
  const counter = useSelector(counterSelector);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const commentContainerRef = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [counter]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe(
        `/api/v1/stayeasy/topic/feedback/${propertyId}`,
        (message) => {
          const newFeedback = JSON.parse(message.body);
          setFeedbacks((prevFeedbacks) => [...prevFeedbacks, newFeedback]);
        }
      );
    });
    return () => stompClient.disconnect();
  }, [propertyId]);

  const handleSendFeedback = () => {
    const idUser = JSON.parse(localStorage.getItem("user"))?.id;
    if (newFeedback && idUser) {
      const socket = new SockJS("http://localhost:8080/api/v1/stayeasy/ws");
      const stompClient = Stomp.over(socket);
      stompClient.connect({}, () => {
        stompClient.send(
          `/api/v1/stayeasy/app/feedback/${propertyId}`,
          {},
          JSON.stringify({
            content: newFeedback,
            userId: user?.id,
            username: `${user?.lastName}  ${user?.firstName}`,
            avatar: user?.avatar,
            propertyId: propertyId,
          })
        );
      });
      setNewFeedback("");
    } else {
      dispatch(grouptSlice.actions.openLoginForm());
    }
  };

  console.log("dataFedd: ", feedbacks);

  useEffect(() => {
    // Lấy danh sách phản hồi từ API khi component được tạo
    fetch(`http://localhost:8080/api/v1/stayeasy/feedback/get/${propertyId}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedbacks:", error));

    // Thiết lập kết nối WebSocket để lắng nghe phản hồi mới (đã triển khai trước đó)
  }, [propertyId]);

  useEffect(() => {
    // Sau khi nhận được danh sách bình luận mới, cuộn xuống cuối container

    if (commentContainerRef.current) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
    }
  }, [feedbacks]);

  return (
    <div>
      <h1>{feedbacks?.length} Bình luận</h1>
      <ul className="container show-cm" ref={commentContainerRef}>
        {feedbacks?.map((feedback, index) => (
          <li className="row" key={index}>
            <div className="col-md-8">
              <div className="media g-mb-30 media-comment">
                <img
                  className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                  src={
                    feedback.avatar ||
                    `https://bootdey.com/img/Content/avatar/avatar7.png`
                  }
                  alt="Image Description"
                />

                <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                  <div className="g-mb-15">
                    <h5 className="h5 g-color-gray-dark-v1 mb-0">
                      {feedback.username || "Ẩn Danh"}
                    </h5>
                    <span className="g-color-gray-dark-v4 g-font-size-12">
                      {feedback.createAt}
                    </span>
                  </div>

                  <p>{feedback.content}</p>

                  <ul className="list-inline d-sm-flex my-0">
                    <li className="list-inline-item g-mr-20">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                        178
                      </a>
                    </li>
                    <li className="list-inline-item g-mr-20">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                        34
                      </a>
                    </li>
                    <li className="list-inline-item ml-auto">
                      <a
                        className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="#!"
                      >
                        <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                        Reply
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* write comment */}
      <div className="container">
        <div className="row">
          <div className="col-md-8 write-cm w-[65%] rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px]">
            <div className="media g-mb-30 media-comment">
              <img
                className="d-flex g-width-50 rounded-circle g-mt-3 g-mr-15"
                src={
                  user?.avatar ||
                  `https://bootdey.com/img/Content/avatar/avatar7.png`
                }
                alt="Image Description"
              />

              <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                <div className="g-mb-15">
                  <h5 className="h5 g-color-gray-dark-v1 mb-0">
                    {user?.lastName + user?.firstName}
                  </h5>
                </div>

                <textarea
                  name="comment"
                  id="comment"
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  style={{ height: "100px", width: "100%" }}
                ></textarea>

                <div
                  className="send-btn  bg-red-600 rounded-xl "
                  onClick={handleSendFeedback}
                >
                  <p class="text-white font-medium text-3xl pt-2">
                    Send Feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
