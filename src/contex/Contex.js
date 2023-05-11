import { createContext, useEffect, useMemo, useState } from "react";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";

export const Context = createContext([]);
const idb = window.indexedDB;

const createCollectionsInIndexedDB = () => {
  if (!idb) {
    console.log("This browser doesn`t support");
    return;
  }
  console.log(idb);

  const request = idb.open("note-db", 2);
  request.onupgradeneeded = (event) => {
    const db = request.result;
    if (!db.objectStoreNames.contains("noteData")) {
      db.createObjectStore("noteData", {
        keyPath: "id",
      });
   }
  };
  request.onsuccess = () => {
    console.log("database opened");
  };
  request.onerror = (event) => {
    console.log(event, "error");
  };
};

export const Provider = ({ children }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [DB, setDB] = useState([]);
  const [id, setId] = useState(null);
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState("");
const [allNotesData, setAllNotesData] = useState([]);
  useEffect(() => {
    createCollectionsInIndexedDB();
  }, []);

  const createNote = async () => {
    setEditorState(EditorState.createEmpty());
    const date = new Date();
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const id = uuidv4();
    setActive(id);
    setId(id);
    const data = {
      id,
      value: "",
      name: EditorState.createEmpty(),
      date: formattedDate,
    };
    setDB((prev) => [...prev, data]);
    
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const deleteNote = (id) => {
    setDB((prev) => prev.filter((item) => item.id !== id));
    setActive(null);
     const dbPromise = idb.open("note-db", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("noteData", 'readwrite');
      const noteData = tx.objectStore("noteData");
      const notes = DB.map((item) => {
        noteData.delete(item?.id);
      });
      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
      };

      notes.onerror = (event) => {
        console.log(event, "error");
      };
    };
  };

  const handleChange = (e) => {
    setEditorState(e);
    const contentState = e.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join("/n");

    setDB((prev) => {
      const findElement = prev.findIndex((el) => el.id === active);
      if (findElement !== -1) {
        const elements = [...prev];
        elements[findElement].name = e;
        elements[findElement].value =
          plainText.length > 30 ? plainText.slice(0, 32) + "..." : plainText;

        return [...elements];
      }
      return prev;
    });
    const dbPromise = idb.open("note-db", 2);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("noteData", "readwrite");
      const noteData = tx.objectStore("noteData");
      const notes = DB.map((item) => {
        noteData.put({
        id: item.id,
        name: item.value,
      });
      }) 
      notes.onsuccess = () => {
        tx.oncomplete = () => {
          db.close();
        };
       
      };

      notes.onerror = (event) => {
        console.log(event, "error");
      };
    };
  };

  const filtredArray = useMemo(() => {
    if (values === "") {
      return DB;
    }
    const findElement = DB.filter((item) => {
      return item.value.toLowerCase().includes(values.toLowerCase());
    });

    if (findElement.length) {
      setEditorState(findElement[0].name);
    }
    return findElement;
  }, [values, active]);

  const openEditor = (id) => {
    const findElement = DB.find((el) => el.id === id);
    setActive(id);
    setEditorState(findElement.name);
  };

  const handleSearch = (value) => {
    setValues(value);
    setActive(null);
  };

  return (
    <Context.Provider
      value={{
        DB,
        editorState,
        setEditorState,
        createNote,
        handleChange,
        openEditor,
        active,
        deleteNote,
        isOpen,
        openModal,
        handleSearch,
        filtredArray,
        values,
        setIsOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};
