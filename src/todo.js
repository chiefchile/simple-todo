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
			titles: [{title: null, noteId: null}],
			selectedNote: {note: null, title: null},
			isNewNote: false
		};
	}
	
	componentDidMount() {
		//console.log('TitleList mounted');
        this.callGetTitlesApi();
    }
	
	callGetTitlesApi() {
		axios.get(`${API_HOST}/titles/${this.props.user}`)
			.then(res => {
				// TODO: Add err handling / err boundary?
				this.setState({titles: res.data.titles});
			});
	}
	
	callGetNoteApi(noteId) {
		axios.get(`${API_HOST}/note/${noteId}`)
			.then(res => {
				if (res.data.code !== 0) {
					// TODO: Add err handling / err boundary?
				}
				
				this.setState({selectedNote: res.data.note, isNewNote: false});
			});
	}
	
	callCreateNoteApi(note) {
		axios.post(`${API_HOST}/note`, note)
			.then(res => {
				console.log(res);
				this.setState({selectedNote: note, isNewNote: false});
				this.callGetTitlesApi();
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	toNewNote() {
		this.setState({selectedNote: null, isNewNote: true});
	}
	
	render() {
		return (
			<div>
				<a href="#" onClick={() => this.toNewNote()}>New Note</a>
				<TitleList titles={this.state.titles} onClick={(noteId) => this.callGetNoteApi(noteId)}/>
				{
					this.state.selectedNote? 
					<Note note={this.state.selectedNote} /> :
					null
				}
				{
					this.state.isNewNote?
					<NewNote onSubmit={(note) => this.callCreateNoteApi(note)} user={this.props.user} /> :
					null
				}
			</div>
		)
	}

}