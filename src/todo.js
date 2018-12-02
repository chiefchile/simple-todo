import { Component, default as React } from 'react';
import axios from 'axios';
import {NewNote} from './new-note';
import {TitleList} from './title-list';
import {Note} from './note';

const API_HOST = 'http://localhost:3002';
// const API_HOST = 'https://alex-simple-todo.herokuapp.com';

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			titles: [{title: null, _id: null}],
			selectedNote: null,
			isNewNote: false
		};
	}
	
	componentDidMount() {
		//console.log('TitleList mounted');
        this.getTitles();
    }
	
	getTitles() {
		axios.get(`${API_HOST}/titles/${this.props.user}`)
			.then(res => {
				// TODO: Add err handling / err boundary?
				this.setState({titles: res.data.titles});
			});
	}
	
	viewNote(_id) {
		axios.get(`${API_HOST}/note/${_id}`)
			.then(res => {
				if (res.data.code !== 0) {
					// TODO: Add err handling / err boundary?
				}
				console.log(res.data.note);
				this.setState({selectedNote: res.data.note, isNewNote: false});
			});
	}
	
	createNote(note) {
		axios.post(`${API_HOST}/note`, note)
			.then(res => {
				console.log(res);
				this.viewNote(res.data._id);
				this.getTitles();
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	updateNote(note) {
		axios.put(`${API_HOST}/note`, note)
			.then(res => {
				console.log(res);
				this.setState({selectedNote: note, isNewNote: false});
				this.getTitles();
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	
	callDeleteNoteApi(_id) {
		axios.delete(`${API_HOST}/note/${_id}`)
			.then(res => {
				console.log(res);
				this.setState({selectedNote: null, isNewNote: false});
				this.getTitles();
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	
	toNewNote() {
		this.setState({selectedNote: null, isNewNote: true});
	}
	
	render() {
		return (
			<div>
				<a href="#" onClick={() => this.toNewNote()}>New Note</a>
				<TitleList titles={this.state.titles} onClick={(_id) => this.viewNote(_id)}/>
				{
					this.state.selectedNote ? 
					<Note note={this.state.selectedNote} 
						onUpdate={(note) => this.updateNote(note)} 
						onDelete={(_id) => this.callDeleteNoteApi(_id)} /> :
					null
				}
				{
					this.state.isNewNote ?
					<NewNote onSubmit={(note) => this.createNote(note)} user={this.props.user} /> :
					null
				}
			</div>
		)
	}

}