import { default as React } from "react";
import Title from "./title";
import IResult from "./result";

interface Props {
  titles: Title[];
  onClick(_id: string | undefined, result: IResult | null): void;
}

export const TitleList = (props: Props) => {
  return (
    <div id="titles">
      <ul id="todo-list">
        {props.titles.map((title: Title) => (
          <li key={title._id}>
            <a href="#" onClick={() => props.onClick(title._id, null)}>
              <span
                className="glyphicon glyphicon-list-alt note-icon"
                aria-hidden="true"
              />
              &nbsp;
              {title.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
