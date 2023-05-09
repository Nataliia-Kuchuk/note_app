import { createContext, useMemo, useState } from "react";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
export const Context = createContext([]);

export const Provider = ({ children }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [DB, setDB] = useState([]);
  const [id, setId] = useState(null);
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(DB);
  const createNote = () => {
    setEditorState(() => EditorState.createEmpty());
     const date = new Date(); 
  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
    setDB((prev) => {
      const id = uuidv4();
      setActive(id)
      setId(id);
      return [...prev, { value: "", name: EditorState.createEmpty(), id, date: formattedDate }];
    });
  };
  const openModal = () => {
    setIsOpen(true)
  }
    
  const deleteNote = (id) => {
    setDB((prev) => {
      return prev.filter((item) => item.id !== id);
    });
    setActive(null)
  };
  const handleChange = (e) => {
    setEditorState(e);
    const contentState = e.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const plainText = rawContentState.blocks
      .map((block) => block.text)
      .join('/n')
    
    setDB(() => {
      const findElement = DB.findIndex((el) => el.id === active);
      if (findElement !== -1) {
        const elements = [...DB];
        elements[findElement].name = e;
        elements[findElement].value = plainText.length > 30 ? plainText.slice(0, 30) + '...' : plainText
      
        return [...elements];
      }
    });
  };
  const handleSearch = () => {
    
  }
  const openEditor = (id) => {
    const findElement = DB.find((el) => el.id === id);
    console.log(findElement);
    setEditorState(findElement.name);
    setActive(id);
  };
  const value = useMemo(
    () => ({
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
      setIsOpen
    }),

    [editorState, DB, isOpen]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
