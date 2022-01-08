import { default as React, useState, useEffect } from "react";
import axios from "axios";
import { NewNote } from "./new-note";
import { TitleList } from "./title-list";
import { ViewNote } from "./view-note";
import Title from "./title";
import Note from "./note";
import { default as IResult, Result } from "./result";
import { Logo } from "./logo";
import { Toolbar } from "./toolbar";

// const NODEJS_LOCALHOST = "http://localhost:3002";
// export const API_HOST = "https://simple-todo-backend.herokuapp.com";
export const API_HOST =
  process.env.REACT_APP_API_HOST || "http://127.0.0.1:8000";

interface Props {
  authToken?: string;
}

export default function Todo(props: Props) {
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [result, setResult] = useState<IResult | null>(null);

  const axiosConfig = {
    headers: { Authorization: `Token ${props.authToken}` },
  };

  useEffect(() => {
    updateTitles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateTitles() {
    axios.get(`${API_HOST}/titles/`, axiosConfig).then((res) => {
      // TODO: Add err handling / err boundary?
      setTitles(res.data);
    });
  }

  function viewNote(_id: string | undefined, result: IResult | null) {
    axios.get(`${API_HOST}/note/${_id}/`, axiosConfig).then((res) => {
      // console.log(res.data);
      setSelectedNote(res.data);
      setIsNewNote(false);
      setResult(result);
    });
  }

  function createNote(note: Note) {
    axios
      .post(`${API_HOST}/note/`, note, axiosConfig)
      .then((res) => {
        // console.log(res);
        viewNote(res.data._id, new Result(res.status, "Note created"));
        updateTitles();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function updateNote(note: Note) {
    axios
      .put(`${API_HOST}/note/${note._id}/`, note, axiosConfig)
      .then((res) => {
        // console.log(res);
        viewNote(note._id, new Result(res.status, "Note updated"));
        updateTitles();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function deleteNote(_id: string) {
    axios
      .delete(`${API_HOST}/note/${_id}/`, axiosConfig)
      .then((res) => {
        // console.log(res);
        setSelectedNote(null);
        setIsNewNote(false);
        updateTitles();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function toNewNote() {
    setSelectedNote(null);
    setIsNewNote(true);
  }

  function refresh() {
    if (selectedNote) {
      viewNote(selectedNote._id, null);
    }
    updateTitles();
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-md-offset-1" id="sidebar">
          <Logo isCenter={false} />
          <Toolbar toNewNote={toNewNote} refresh={refresh} />
          <TitleList titles={titles} onClick={viewNote} />
        </div>
        <div className="col-md-6 col-md-offset-3" id="main-content">
          {selectedNote ? (
            <ViewNote
              note={selectedNote}
              onUpdate={(note) => updateNote(note)}
              onDelete={(_id: string) => deleteNote(_id)}
              result={result}
            />
          ) : null}
          {isNewNote ? <NewNote onSubmit={(note) => createNote(note)} /> : null}
        </div>
      </div>
    </div>
  );
}
