import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../../ducks/reducer";
import { Link } from "react-router-dom";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();
    console.log("here");
    axios
      .post("/api/login", this.state)
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  register = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", this.state)
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="auth-view">
        <h1>Helo</h1>
        <h4>Username: </h4>
        <input
          value={this.state.username}
          name="email"
          placeholder="Email"
          onChange={(e) => this.handleInput(e)}
        />
        <h4>Password: </h4>
        <input
          type="password"
          value={this.state.password}
          name="password"
          placeholder="Password"
          onChange={(e) => this.handleInput(e)}
        />
        <div>
          <button className="login" onClick={(e) => this.login(e)}>
            Log In
          </button>
          <button className="regis" onClick={(e) => this.register(e)}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUser })(Auth);
