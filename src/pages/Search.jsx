import React, {useEffect} from 'react';
import styles from '../styles/Search.module.scss';
import {Button, Form, Input} from "antd";
import {searchTracks, setSearchName} from "../redux/musicReducer";
import * as queryString from "query-string";

export default function Search({dispatch, state, history}) {
    const {track} = queryString.parse(history.location.search)
    const [newForm] = Form.useForm()

    useEffect(() => {
        if (track && track !== state.searchName) {
            dispatch(setSearchName(track))
        } else if (state.searchName) {
            dispatch(searchTracks(state.searchName))
        }
    }, [dispatch, state.searchName, track])

    const validateInputs = {
        required: 'This field is required!',
        max: {
            track: 'Search name cannot be longer than 50 characters!'
        }
    }

    const handleSaveClient = ({track}) => {
        if (track.trim()) {
            history.push(`?track=${track}`)
            dispatch(setSearchName(track))
            newForm.resetFields()
        }
    }

    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 16}
    }

    return (
        <main className={styles.container}>
            <Form form={newForm} onFinish={handleSaveClient} validateMessages={validateInputs} {...layout}>
                <Form.Item name={'track'} label="Track name" rules={[{required: true, max: 50}]}>
                    <Input/>
                </Form.Item>
                <Button id="search" type="primary" htmlType="submit" loading={state.isFetching}>Search</Button>
            </Form>
            <div className={styles.results}>
                {state.searchResults.length >= 1
                    ? <>
                        <h1>Results:</h1>
                        {state.searchResults.map((item, index) => {
                            return <div className={styles.resultItem} key={index}>{item.artist}: "{item.name}"</div>
                        })}
                    </>
                    : null
                }

            </div>
        </main>
    )
}