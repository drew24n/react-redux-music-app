import {fetchTopTracks} from "../api/topTracks";
import {notificationError} from "../utils/notifications";
import {fetchArtistInfo} from "../api/artistInfo";

const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"
const SET_PAGE_SIZE = "SET_PAGE_SIZE"
const SET_TRACKS = "SET_TRACKS"
const SET_ARTIST_INFO = "SET_ARTIST_INFO"

const initialState = {
    tracks: [],
    pageNumber: 1,
    pageSize: 50,
    totalCount: 0,
    isFetching: false,
    artist: {
        name: '',
        summary: '',
        tags: [],
        imgUrl: ''
    }
}

export const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRACKS:
            return {
                ...state, tracks: [...action.tracks]
            }
        case SET_ARTIST_INFO:
            return {
                ...state, artist: {
                    name: action.artistInfo.name,
                    summary: action.artistInfo.summary,
                    tags: [...action.artistInfo.tags],
                    imgUrl: action.artistInfo.imgUrl
                }
            }
        case SET_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case SET_PAGE_NUMBER:
            return {
                ...state, pageNumber: action.pageNumber
            }
        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.pageSize
            }
        default:
            return state
    }
}

const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
const setPageSize = (pageSize) => ({type: SET_PAGE_SIZE, pageSize})
const setTracks = (tracks) => ({type: SET_TRACKS, tracks})
const setArtistInfo = (artistInfo) => ({type: SET_ARTIST_INFO, artistInfo})
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber})

export const getTopTracks = (pageNumber) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {tracks} = await fetchTopTracks(pageNumber)
        dispatch(setTotalCount(parseInt(tracks.["@attr"].total)))
        dispatch(setPageSize(parseInt(tracks.["@attr"].perPage)))
        dispatch(setTracks(tracks.track))
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const getArtistInfo = (artistName) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {artist} = await fetchArtistInfo(artistName)
        dispatch(setArtistInfo({
            name: artist.name,
            summary: artist.bio.content,
            tags: artist.tags.tag,
            imgUrl: artist.image[2].["#text"]
        }))
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsFetching(false))
    }
}