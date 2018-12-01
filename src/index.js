import { Component, Fragment, default as React } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const API_HOST = 'http://localhost:3002';
// const API_HOST = 'https://alex-simple-todo.herokuapp.com';

class TitleList extends Component {
    constructor(props) {
		super(props);
		this.state = {
			titles: [{title: null, noteId: null}], 
			selectedNoteId: null
		};
	}

    componentDidMount() {
        axios.get(`${API_HOST}/titles/alex`)
        .then(res => {
			// TODO: Add err handling / err boundary?
            this.setState({titles: res.data.titles});
        })
    }
	
	handleClick(noteId) {
		this.setState({selectedNoteId: noteId});
	}

    render() {
        return (
			<Fragment>
				<ul>
					{this.state.titles.map(title => 
					<li key={title.noteId}>
						<a href="#" onClick={() => this.handleClick(title.noteId)}>{title.title}</a>
					</li>)}
				</ul>
				<Note noteId={this.state.selectedNoteId} />
			</Fragment>
        )
    }
}

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			note: {note: null, title: null}
		};
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.noteId !== prevProps.noteId) {
			axios.get(`${API_HOST}/note/${this.props.noteId}`)
			.then(res => {
				if (res.data.code !== 0) {
					// TODO: Add err handling / err boundary?
				}
				
				this.setState({note: res.data.note});
			})
		}
	}
	
	render() {
		return (
			<div>
				<h4>{this.state.note.title}</h4>
				<div>{this.state.note.note}</div>
			</div>
		)
	}
}

ReactDOM.render(
    <TitleList />,
    document.getElementById('root')
  );
