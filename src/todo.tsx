import { Component, default as React } from "react";
import axios from "axios";
import { NewNote } from "./new-note";
import { TitleList } from "./title-list";
import { ViewNote } from "./view-note";
import Title from "./title";
import Note from "./note";
import Result from "./result";
import { Logo } from "./logo";

// export const API_HOST = "http://localhost:3002";
// export const API_HOST = "https://simple-todo-backend.herokuapp.com";
export const API_HOST =
  process.env.REACT_APP_API_HOST || "http://localhost:3002";

interface State {
  titles: Title[];
  selectedNote: Note | null;
  isNewNote: boolean;
  result: Result | null;
}

interface Props {
  user: string;
}

export default class Todo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      titles: [],
      selectedNote: null,
      isNewNote: false,
      result: null
    };
    this.viewNote = this.viewNote.bind(this);
  }

  componentDidMount() {
    //console.log('Todo mounted');
    this.getTitles();
  }

  getTitles() {
    axios.get(`${API_HOST}/titles/${this.props.user}`).then(res => {
      // TODO: Add err handling / err boundary?
      this.setState({ titles: res.data.titles });
    });
  }

  viewNote(_id: string | undefined, result: Result | null) {
    axios.get(`${API_HOST}/note/${_id}`).then(res => {
      if (res.data.code !== 0) {
        // TODO: Add err handling / err boundary?
      }
      console.log(res.data.note);
      this.setState({
        selectedNote: res.data.note,
        isNewNote: false,
        result: result
      });
    });
  }

  createNote(note: Note) {
    axios
      .post(`${API_HOST}/note`, note)
      .then(res => {
        console.log(res);
        this.viewNote(res.data._id, res.data);
        this.getTitles();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateNote(note: Note) {
    axios
      .put(`${API_HOST}/note`, note)
      .then(res => {
        console.log(res);
        this.viewNote(note._id, res.data);
        this.getTitles();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteNote(_id: string) {
    axios
      .delete(`${API_HOST}/note/${_id}`)
      .then(res => {
        console.log(res);
        this.setState({ selectedNote: null, isNewNote: false });
        this.getTitles();
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  toNewNote() {
    this.setState({ selectedNote: null, isNewNote: true });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" id="sidebar">
            <Logo isCenter={false} />
            <div className="toolbar">
              <button
                type="button"
                className="btn btn-default btn-xs"
                onClick={() => this.toNewNote()}
              >
                <span className="glyphicon glyphicon-plus" aria-hidden="true" />{" "}
                New Note
              </button>
            </div>
            <TitleList titles={this.state.titles} onClick={this.viewNote} />
          </div>
          <div className="col-md-7 col-md-offset-3">
            {this.state.selectedNote ? (
              <ViewNote
                note={this.state.selectedNote}
                onUpdate={note => this.updateNote(note)}
                onDelete={(_id: string) => this.deleteNote(_id)}
                result={this.state.result}
              />
            ) : null}
            {this.state.isNewNote ? (
              <NewNote
                onSubmit={note => this.createNote(note)}
                user={this.props.user}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
