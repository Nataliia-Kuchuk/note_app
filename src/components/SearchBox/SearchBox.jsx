import React from 'react';
import styles from './Search.module.css'

const SearchBox = () => {
    return (
        <div className={styles.container}>
            <input type="text" placeholder='Search' className={styles.search_input} />
        </div>
    );
};

export default SearchBox;