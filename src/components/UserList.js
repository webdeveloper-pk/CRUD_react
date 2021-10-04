import React, { useState } from "react";
import styles from "./Todo.module.css";

var editId = 0;
var desc = "submit";

const UserList = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    password: "",
    rollno: "",
  });

  const [usersData, setUsersData] = useState([]);

  const onChnageHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (desc === "submit") {
      setUsersData([...usersData, users]);
    } else {
      const editData = [...usersData];
      // const editUsers = ([...users]);
      editData[editId].name = users.name;
      editData[editId].email = users.email;
      editData[editId].password = users.password;
      editData[editId].rollno = users.rollno;
      desc = "submit";
    }
    setUsers({
      name: "",
      email: "",
      password: "",
      rollno: "",
    });
  };

  const editItem = (id) => {
    const temp = usersData[id];
    setUsers({
      name: temp.name,
      email: temp.email,
      password: temp.password,
      rollno: temp.rollno,
    });
    editId = id;
    desc = "edit";
    console.log(temp, "edit testing");
  };

  const removeItem = (id) => {
    const updatedArray = [...usersData];
    //delete through Filter
    const newArray = updatedArray.filter((element, ind) => {
      return ind !== id;
    });
    setUsersData(newArray);

    // delete through splice
    // updatedArray.splice(id, 1);
    // setUsersData(updatedArray);

    console.log(usersData, "Old Array");
    console.log(newArray, "New Array");
  };

  return (
    <>
      <div className={styles.list_wrapper}>
        <h1>React CRUD Application</h1>
        <form
          onSubmit={(e) => {
            onSubmitHandler(e);
          }}
        >
          <input
            type="text"
            pattern="[a-zA-Z. ]+"
            placeholder="Enter Name"
            name="name"
            value={users.name}
            onChange={(e) => onChnageHandler(e)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={users.email}
            onChange={(e) => onChnageHandler(e)}
            pattern="[a-zA-Z0-9_.-]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z]{1,}"
            required
          />
          <input
            type="text"
            placeholder="Enter Password"
            name="password"
            value={users.password}
            onChange={(e) => onChnageHandler(e)}
            pattern="(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{6,15}"
            required
          />
          <input
            type="text"
            placeholder="Enter Roll No"
            name="rollno"
            value={users.rollno}
            onChange={(e) => onChnageHandler(e)}
            pattern="[[0-9]+"
            required
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <table table="true" className="table mt-4">
          <thead>
            <tr className="bg-dark text-white">
              <th scope="col"> Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Rollno</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length ? (
              usersData.map((user, ind) => (
                <tr key={ind}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password} </td>
                  <td>{user.rollno} </td>
                  <td>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => editItem(ind)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => removeItem(ind)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className={styles.message_wrapper}>
                <p></p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
