import { default as React, Component } from "react";
import ReactDOM from "react-dom";
import { default as Todo, API_HOST } from "./todo";
import "./index.css";
import { Login } from "./login";
import axios from "axios";
import User from "./user";
import IResult, { Result } from "./result";

interface State {
  username: string;
  loginResult: IResult | null;
}

class Main extends Component<any, State> {
  state = {
    username: "",
    loginResult: null
  };

  login(user: User): void {
    axios
      .post(`${API_HOST}/login/`, user)
      .then(res => {
        console.log(res);
        this.setState({ username: user.username });
      })
      .catch(error => {
        this.setState({
          loginResult: new Result(
            error.response.status,
            "Invalid username/password pair"
          )
        });
        console.log(error);
      });
  }

  loginAsGuest(): void {
    this.setState({ username: "guest" });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <Todo user={this.state.username} />
        ) : (
          <Login
            onSubmit={(user: User) => this.login(user)}
            onLoginAsGuest={() => this.loginAsGuest()}
            loginResult={this.state.loginResult}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
