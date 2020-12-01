import {instance} from "./_config";

export const fetchTopTracks = (pageNumber = 1) => {
    return instance.get('', {params: {method: 'chart.gettoptracks', page: pageNumber}}).then(res => res.data)
}