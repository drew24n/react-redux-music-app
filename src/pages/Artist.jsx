import React, {useEffect} from 'react';
import styles from '../styles/Artist.module.scss';
import * as queryString from "query-string";
import {getArtistInfo} from "../redux/musicReducer";

export default function Artist({dispatch, history, state}) {
    const {name} = queryString.parse(history.location.search)

    useEffect(() => {
        dispatch(getArtistInfo(name))
    }, [dispatch, name])

    return (
        <main className={styles.container}>
            <h1>Artist Info</h1>
            <div>
                <h2>{state.artist.name}</h2>
                <p>
                    <img src={state.artist.imgUrl} alt="artist img"/>
                    {state.artist.summary}
                </p>
                <div className={styles.tags}>Tags:
                    {state.artist.tags.map((t, index) => {
                        return <a key={index} href={t.url} target="_blank" rel="noreferrer"> {t.name} </a>
                    })}
                </div>
            </div>
        </main>
    )
}