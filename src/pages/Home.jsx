import React, {useEffect} from 'react';
import styles from '../styles/Home.module.scss';
import {getTopTracks, setPageNumber} from "../redux/musicReducer";
import {Pagination} from "antd";
import * as queryString from "query-string";
import {NavLink} from "react-router-dom";

export default function Home({dispatch, state, history}) {
    const {page} = queryString.parse(history.location.search)

    useEffect(() => {
        if (page && +page !== state.pageNumber) {
            dispatch(setPageNumber(+page))
        } else {
            dispatch(getTopTracks(state.pageNumber, 30))
        }
    }, [dispatch, state.pageNumber, page])

    const paginationHandler = (pageNumber) => {
        history.push(`?page=${pageNumber}`)
        window.scrollTo({top: 0})
        dispatch(setPageNumber(pageNumber))
    }

    return (
        <main className={styles.container}>
            <h1>Top Tracks</h1>
            <div className={styles.tracksGrid}>
                {state.tracks.map((track, index) => {
                    return (
                        <div key={index} className={styles.trackItem}>
                            <div className={styles.title}>
                                <NavLink to={`/artist?name=${track.artist.name}`}>
                                    <p>{track.artist.name}: "{track.name}"</p>
                                </NavLink>
                            </div>
                            <img src={track.image[2].["#text"]} alt="cover"/>
                            <a href={track.url} target="_blank" rel="noreferrer">Artist Profile</a>
                        </div>
                    )
                })}
            </div>
            <Pagination defaultCurrent={1} current={state.pageNumber} total={state.totalCount}
                        onChange={paginationHandler} pageSize={30} showSizeChanger={false} size="small"/>
        </main>
    )
}