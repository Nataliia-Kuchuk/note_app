import React, { useContext } from "react";
import styles from "./ListItem.module.css";
import { Context } from "../../contex/Contex";

const ListItem = ({ item }) => {
  const { openEditor, active } = useContext(Context);
 
  console.log(item.value)
  return (
    <div
      className={`${styles.item} ${
        active === item.id ? `${styles.active}` : ""
      }`}
      onClick={() => openEditor(item.id)}
    >
      {item.value}
      <div className={styles.date}>{item.date}</div>
    </div>
  );
};

export default ListItem;
