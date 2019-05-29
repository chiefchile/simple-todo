import { default as React, Component } from "react";
import ReactDOM from "react-dom";
import { default as Todo, API_HOST } from "./todo";
import "./index.css";
import { Login } from "./login";
import axios from "axios";
import User from "./user";
import IResult, { Result } from "./result";

interface State {
  loginResult: IResult | null;
  authToken?: string;
}

export class Main extends Component<any, State> {
  state = {
    loginResult: null,
    authToken: undefined
  };

  login(user: User): void {
    axios
      .post(`${API_HOST}/api-token-auth/`, user)
      .then(res => {
        console.log(res);
        this.setState({ authToken: res.data.token });
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
    let guest: User = { username: "guest", password: "guest" };
    this.login(guest);
  }

  render() {
    return (
      <div>
        {this.state.authToken ? (
          <Todo authToken={this.state.authToken} />
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
