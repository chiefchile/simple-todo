import { Component, Fragment, default as React } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {NewNote} from './new-note';
import { Switch, Route, Link  } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

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
        axios.get(`${API_HOST}/titles/${this.props.user}`)
			.then(res => {
				// TODO: Add err handling / err boundary?
				this.setState({titles: res.data.titles});
			});
    }
	
	handleClick(noteId) {
		this.setState({selectedNoteId: noteId});
	}

    render() {
        return (
			<Fragment>
				<Link to='/new-note'>New Note</Link>
				<ul>
					{this.state.titles.map(title => 
					<li key={title.noteId}>
						<Link to={`/view-note/${title.noteId}`}>{title.title}</Link>
					</li>)}
				</ul>

				<Switch>
					<Route path='/view-note/:noteId' component={Note}/>
					<Route exact path='/new-note' component={() => <NewNote user={this.props.user}/>}/>
				</Switch>
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
	
	componentDidMount() {
		this.callGetNoteApi();
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.match.url !== prevProps.match.url) {
			this.callGetNoteApi();
		}
	}
	
	callGetNoteApi() {
		axios.get(`${API_HOST}/note/${this.props.match.params.noteId}`)
			.then(res => {
				if (res.data.code !== 0) {
					// TODO: Add err handling / err boundary?
				}
				
				this.setState({note: res.data.note});
			});
	}
	
	render() {
		return (
			<Fragment>
				<h4>{this.state.note.title}</h4>
				<div id="note">{this.state.note.note}</div>
			</Fragment>
		)
	}
}

ReactDOM.render((
  <BrowserRouter>
    <TitleList user="alex" />
  </BrowserRouter>
), document.getElementById('root'));
