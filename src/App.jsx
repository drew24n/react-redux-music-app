import React, {useEffect} from 'react';
import styles from './styles/App.module.scss';
import {Switch, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/Home";
import {notificationError} from "./utils/notifications";

export default function App() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        window.addEventListener("unhandledrejection", error => notificationError(error))
    }, [])

    return (
        <div className={styles.container}>
            <Switch>
                <Route exact path={'/'} render={() => <Home dispatch={dispatch}/>}/>
            </Switch>
        </div>
    )
}