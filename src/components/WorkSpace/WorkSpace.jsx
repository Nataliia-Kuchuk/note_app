import React, { useContext, useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./WorkSpace.css";
import { Context } from "../../contex/Contex";

function WorkSpace() {
  const { editorState, handleChange, DB, active } = useContext(Context);

  return (
    <div className="date">
      {DB.filter((item) => item.id === active).map((item) => {
        return <div>{item.date}</div>
      })}
      <Editor
      
        editorState={editorState}
        onChange={handleChange}
      />
    </div>
  );
}

export default WorkSpace;
