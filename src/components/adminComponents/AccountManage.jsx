import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function AccountManage() {
  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/stayeasy/admin/user/all`)
      .then(function (response) {
        // console.log("data: ", response.data);
        setDataUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="shadow-lg m-8 rounded-lg">
      <h1>Bảng thống kê accoutn</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>stt</th>
            <th>họ</th>
            <th>tên</th>
            <th>email</th>
            <th>quyền</th>
            <th>địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {dataUser.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.lastName}</td>
              <td>{e.firstName}</td>
              <td>{e.email}</td>
              <td>{e.roleName}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AccountManage;
