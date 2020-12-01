import {instance} from "./_config";

export const fetchArtistInfo = (artist) => {
    return instance.get('', {params: {method: 'artist.getinfo', artist: artist}}).then(res => res.data)
}