import React, { useState } from "react";
import { createUser } from "../../../actions/auth";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { db } from "../../../services/firebase";
import { validateSignUpData } from "../helpers/validator";

const Register = ({ createUser, history, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    errors: {},
  });
  const {email, password, username} = formData

  const onSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validateSignUpData(formData);
    if (!valid) {
      setFormData({
        ...formData,
        errors: errors,
      });
      return;
    }
    try {
      db.collection("users")
        .where("username", "==", username.toLowerCase())
        .get()
        .then((snap) => {
          if(snap.empty){
            return createUser({email, username, password}, history)
          }
          alert("user found pleae pick another user")
        });
    } catch (error) {
      console.log(error)
      alert("error found with server")
    }
  };

  const onChangeHandler = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="col-md-8 mx-auto py-4 text-center">
      <h2> Register </h2>
      <p> Create A new user to add to existing users </p>
      <div>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="mt-2 shadow-lg py-4 rounded"
        >
          <div className="form-group d-md-flex justify-content-around">
            <div className="col-md-9">
              <input
                type="text"
                onChange={(e) => onChangeHandler(e)}
                value={formData.email}
                placeholder="Email"
                className="form-control mb-3"
                id="email"
              />

              <input
                type="text"
                onChange={(e) => onChangeHandler(e)}
                value={formData.username}
                placeholder="Username"
                className="form-control mb-3"
                id="username"
              />

              <input
                type="password"
                onChange={(e) => onChangeHandler(e)}
                value={formData.password}
                placeholder="Password"
                className="form-control mb-3"
                id="password"
              />

              <input
                type="password"
                onChange={(e) => onChangeHandler(e)}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                className="form-control mb-3"
                id="confirmPassword"
              />

              <input
                type="submit"
                value="Submit"
                className=" mt-3 form-control btn btn-outline-danger"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  createUser: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { createUser })(Register);

// const breatheAnimation = keyframes`
//  0% { height: 100px; width: 100px; }
//  30% { height: 400px; width: 400px; opacity: 1 }
//  40% { height: 405px; width: 405px; opacity: 0.3; }
//  100% { height: 600px; width: 100px; opacity: 0.6; }
// `
// const Circle = styled.div`
//  height: 100px;
//  width: 100px;
//  border-style: solid;
//  border-width: 5px;
//  border-radius: 50%;
//  border-color: black;
//  animation-name: ${breatheAnimation};
//  animation-duration: 10s;
//  animation-iteration-count: infinite;
//  animation-fill-mode: both;
// `
// const Container = styled.div`
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  flex-direction: column;
//  height: 450px;
//  `
