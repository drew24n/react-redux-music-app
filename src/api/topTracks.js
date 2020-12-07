import {instance} from "./_config";

export const fetchTopTracks = (pageNumber = 1, pageSize = 30) => {
    return instance.get('', {params: {method: 'chart.gettoptracks', page: pageNumber, limit: pageSize}})
        .then(res => res.data)
}