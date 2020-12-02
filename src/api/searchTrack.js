import {instance} from "./_config";

export const findTracks = (trackName = '') => {
    return instance.get('', {params: {method: 'track.search', track: trackName}}).then(res => res.data)
}