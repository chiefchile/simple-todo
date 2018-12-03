import { default as React, Component } from 'react';
import ReactDOM from 'react-dom';
import ToDo from './todo';
import './index.css';
import { Login } from './login';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Main extends Component {
    state = {
        user: null
    };

    login(username, password) {
        this.setState({ user: username });
    }

    loginAsGuest() {
        this.setState({ user: 'guest' });
    }

    render() {
        return (
            <div>
                {
                    this.state.user ?
                        <ToDo user={this.state.user} /> :
                        <Login onSubmit={(username, password) => this.login(username, password)} 
                            onLoginAsGuest={() => this.loginAsGuest()}
                        />
                }
            </div>
        )
    }
}

ReactDOM.render((
    <Main />
), document.getElementById('root'));
