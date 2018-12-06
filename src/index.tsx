import { default as React, Component } from 'react';
import ReactDOM from 'react-dom';
import ToDo from './todo';
import './index.css';
import { Login } from './login';
import axios from 'axios';
import User from './user';
import Result from './result';

export const API_HOST = 'http://localhost:3002';
// export const API_HOST = 'https://alex-simple-todo.herokuapp.com';

interface State {
    username: string,
    loginResult: Result | null;
}

class Main extends Component<any, State> {
    state = {
        username: '',
        loginResult: null
    };

    login(user: User): void {
        axios.post(`${API_HOST}/login`, user)
            .then(res => {
                console.log(res);
                if (res.data.code !== 0) {
                    this.setState({ loginResult: res.data });
                } else {
                    this.setState({ username: user.username });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    loginAsGuest(): void {
        this.setState({ username: 'guest' });
    }

    render() {
        return (
            <div>
                {
                    this.state.username ?
                        <ToDo user={this.state.username} /> :
                        <Login onSubmit={(user: User) => this.login(user)}
                            onLoginAsGuest={() => this.loginAsGuest()}
                            loginResult={this.state.loginResult}
                        />
                }
            </div>
        )
    }
}

ReactDOM.render((
    <Main />
), document.getElementById('root'));
