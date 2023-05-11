import React, { useContext } from 'react';
import styles from './Search.module.css'
import { Context } from '../../contex/Contex';

const SearchBox = () => {
    const { handleSearch, values } = useContext(Context);
    return (
        <div className={styles.container}>
            <input type="text" placeholder='Search' value={values} className={styles.search_input}  onChange={(e) => handleSearch(e.target.value) }/>
        </div>
    );
};

export default SearchBox;