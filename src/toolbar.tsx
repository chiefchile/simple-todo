import { Component, default as React } from "react";

interface Props {
  toNewNote(): void;
  refresh(): void;
}

export const Toolbar = (props: Props) => {
  return (
    <div className="toolbar">
      <button
        type="button"
        className="btn btn-default btn-xs"
        onClick={() => props.toNewNote()}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true" /> New
        Note
      </button>

      <button
        type="button"
        className="btn btn-default btn-xs btn-adjacent"
        onClick={props.refresh}
      >
        <span className="glyphicon glyphicon-refresh" aria-hidden="true" />{" "}
        Refresh
      </button>
    </div>
  );
};
