import React, { useContext } from "react";
import styles from "./ListItem.module.css";
import { Context } from "../../contex/Contex";

const ListItem = ({ item }) => {
  const { openEditor, editorState, active } = useContext(Context);
  // const truncatedArray = item.value.map((element) => {
  //   return element.length > 30 ? element.slice(0, 30) + "..." : element;
  // });
  console.log(item.value)
  return (
    <div
      className={`${styles.item} ${
        active === item.id ? `${styles.active}` : ""
      }`}
      onClick={() => openEditor(item.id)}
    >
     {item.value}
      {item.date}
    </div>
  );
};

export default ListItem;
