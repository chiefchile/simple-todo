import { Component, default as React } from 'react';
import axios from 'axios';
import {NewNote} from './new-note';
import {TitleList} from './title-list';
import {Note} from './note';
import {Grid, Row, Col} from 'react-bootstrap';
import { API_HOST } from './index';

export default class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			titles: [{title: null, _id: null}],
			selectedNote: null,
			isNewNote: false,
			result: null
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
	
	viewNote(_id, result) {
		axios.get(`${API_HOST}/note/${_id}`)
			.then(res => {
				if (res.data.code !== 0) {
					// TODO: Add err handling / err boundary?
				}
				console.log(res.data.note);
				this.setState({selectedNote: res.data.note, isNewNote: false, result: result});
			});
	}
	
	createNote(note) {
		axios.post(`${API_HOST}/note`, note)
			.then(res => {
				console.log(res);
				this.viewNote(res.data._id, res.data);
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
				this.viewNote(note._id, res.data);
				this.getTitles();
			})
			.catch(function (error) {
				console.log(error);
			})
	}
	
	deleteNote(_id) {
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
			<Grid>
				<Row className="show-grid">
					<Col md={3}>
						<a href="#" onClick={() => this.toNewNote()}>New Note</a>
						<hr/>
						<TitleList titles={this.state.titles} onClick={(_id) => this.viewNote(_id)}/>
					</Col>
					<Col md={9}>
						{
							this.state.selectedNote ? 
							<Note note={this.state.selectedNote} 
								onUpdate={(note) => this.updateNote(note)} 
								onDelete={(_id) => this.deleteNote(_id)} 
								result={this.state.result} /> :
							null
						}
						{
							this.state.isNewNote ?
							<NewNote onSubmit={(note) => this.createNote(note)} user={this.props.user} /> :
							null
						}
					</Col>
				</Row>
			</Grid>
		
		)
	}

}