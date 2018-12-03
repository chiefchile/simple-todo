import { default as React, Component } from 'react';
import ReactDOM from 'react-dom';
import ToDo from './todo';
import './index.css';
import { Login } from './login';
import axios from 'axios';

export const API_HOST = 'http://localhost:3002';
// export const API_HOST = 'https://alex-simple-todo.herokuapp.com';

class Main extends Component {
    state = {
        username: null,
        loginResult: null
    };

    login(user) {
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

    loginAsGuest() {
        this.setState({ username: 'guest' });
    }

    render() {
        return (
            <div>
                {
                    this.state.username ?
                        <ToDo user={this.state.username} /> :
                        <Login onSubmit={(username, password) => this.login(username, password)}
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
