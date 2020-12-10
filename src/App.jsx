import React, {useEffect} from 'react';
import styles from './styles/App.module.scss';
import {Switch, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/Home";
import {notificationError} from "./utils/notifications";
import Artist from "./pages/Artist";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFount";
import {Spin} from "antd";

export default function App() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        window.addEventListener("unhandledrejection", error => notificationError(error))
    }, [])

    return (
        <div className={styles.container}>
            <NavBar/>
            <Spin size="large" spinning={state.isFetching}>
                <Switch>
                    <Route exact path={'/'} render={() => <Home dispatch={dispatch} state={state} history={history}/>}/>
                    <Route path={'/artist'} render={() => <Artist dispatch={dispatch} state={state} history={history}/>}/>
                    <Route path={'/search'} render={() => <Search dispatch={dispatch} state={state} history={history}/>}/>
                    <Route render={() => <NotFound/>}/>
                </Switch>
            </Spin>
            <ScrollToTop top={150} smooth style={{right: '20px', bottom: '45px'}}/>
        </div>
    )
}