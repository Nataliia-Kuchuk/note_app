import React, { useContext } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { Context } from "../../contex/Contex";

import styles from "./Header.module.css";
import plus from "../../assets/plus.png";
import deleteicon from "../../assets/delete_icon.png";

import ModalWrapper from "../Modal/ModalWrapper";

const Header = () => {
  const { createNote, DB, openModal, active } = useContext(Context);
  console.log(DB);
  return (
    <div className={styles.container}>
      <div>
        <button onClick={() => createNote()} className={styles.btn}>
          <img src={plus} alt="" className={styles.btn_img} />
        </button>
        <button className={styles.btn} onClick={openModal} disabled={!active}>
          <img src={deleteicon} alt="" className={styles.btn_img} />
        </button>
      </div>
      <SearchBox />
      <ModalWrapper>Do you realy want delete note?</ModalWrapper>
    </div>
  );
};

export default Header;
