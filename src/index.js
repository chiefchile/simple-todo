import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const API_HOST = 'http://localhost:3002';

class NoteList extends React.Component {
    state = {
        titles: []
    }

    componentDidMount() {
        axios.get(`${API_HOST}/titles`)
        .then(res => {
            this.setState({titles: res.data.titles});
        })
    }

    render() {
        return (
            <ol>
                <ul>
                    { this.state.titles.map(title => <li>{title}</li>)}
                </ul>
            </ol>
        )
    }
}

ReactDOM.render(
    <NoteList />,
    document.getElementById('root')
  );
