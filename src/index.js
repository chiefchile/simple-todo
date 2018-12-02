import { default as React } from 'react';
import ReactDOM from 'react-dom';
import ToDo from './todo';
import './index.css';


ReactDOM.render((
    <ToDo user="alex" />
), document.getElementById('root'));
