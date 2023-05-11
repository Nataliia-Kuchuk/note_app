import React, { useContext, useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./WorkSpace.css";
import { Context } from "../../contex/Contex";

function WorkSpace() {
  const { editorState, handleChange, DB, active } = useContext(Context);
  console.log(active)
  return (
    <div className="date">
      {DB.filter((item) => item.id === active).map((item) => {
        return <div>{item.date}</div>;
      })}
      {active ? (
        <Editor editorState={editorState} onChange={handleChange} />
      ) : (
        <div className="edit">Choose note  to edit</div>
      )}
    </div>
  );
}

export default WorkSpace;
