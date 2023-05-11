import React, { useContext } from 'react';
import { Context } from '../../contex/Contex';
import ListItem from '../ListItem/ListItem';
import styles from './Sidebar.module.css'
const Sidebar = () => {
      const { data, filtredArray } = useContext(Context);
  

console.log(data)
    return (
      <div className={styles.container}>
        {filtredArray?.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    );
};

export default Sidebar;