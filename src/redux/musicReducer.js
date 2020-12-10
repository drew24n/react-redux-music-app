import {fetchTopTracks} from "../api/topTracks";
import {notificationError} from "../utils/notifications";
import {fetchArtistInfo} from "../api/artistInfo";
import {findTracks} from "../api/searchTrack";

const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER"
const SET_TRACKS = "SET_TRACKS"
const SET_ARTIST_INFO = "SET_ARTIST_INFO"
const SET_SEARCH_RESULT = "SET_SEARCH_RESULT"
const SET_SEARCH_NAME = "SET_SEARCH_NAME"

const initialState = {
    tracks: [],
    pageNumber: 1,
    totalCount: 0,
    isFetching: false,
    artist: {
        name: '',
        summary: '',
        tags: [],
        imgUrl: ''
    },
    searchResults: [],
    searchName: ''
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
        case SET_SEARCH_RESULT:
            return {
                ...state, searchResults: [...action.searchResults]
            }
        case SET_SEARCH_NAME:
            return {
                ...state, searchName: action.searchName
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
        default:
            return state
    }
}

const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching})
const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
const setTracks = (tracks) => ({type: SET_TRACKS, tracks})
const setArtistInfo = (artistInfo) => ({type: SET_ARTIST_INFO, artistInfo})
const setSearchResults = (searchResults) => ({type: SET_SEARCH_RESULT, searchResults})
export const setSearchName = (searchName) => ({type: SET_SEARCH_NAME, searchName})
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber})

export const getTopTracks = (pageNumber, pageSize) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {tracks} = await fetchTopTracks(pageNumber, pageSize)
        if (tracks) {
            // dispatch(setTotalCount(parseInt(tracks.["@attr"].total)))
            dispatch(setTotalCount(1500)) //hardcoded due to api limitations
            dispatch(setTracks(tracks.track))
        }
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
            imgUrl: artist.image[2]["#text"]
        }))
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsFetching(false))
    }
}

export const searchTracks = (track) => async (dispatch) => {
    try {
        dispatch(setIsFetching(true))
        const {results} = await findTracks(track)
        dispatch(setSearchResults(results.trackmatches.track.map(track => ({
            name: track.name,
            artist: track.artist
        }))))
    } catch (error) {
        notificationError(error)
    } finally {
        dispatch(setIsFetching(false))
    }
}