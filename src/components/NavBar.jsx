import React from 'react';
import styles from '../styles/NavBar.module.scss';
import {NavLink} from "react-router-dom";

export default function NavBar() {
    return (
        <header className={styles.container}>
            <NavLink activeClassName={styles.active} exact to={'/'}>Home</NavLink>
            <NavLink activeClassName={styles.active} exact to={'/search'}>Search</NavLink>
        </header>
    )
}