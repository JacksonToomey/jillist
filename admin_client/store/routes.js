import * as api from './middleware/api/actions';
import * as stats from './state/stats/actions';

export default {
    "/admin/": {
        controller: () => dispatch => {
            dispatch(api.fetchUsage())
            .catch(e => { console.log(e); })
            .then(r => { dispatch(stats.setStat('usage', r.data)); });

            dispatch(api.fetchTotals())
            .catch(e => { console.log(e); })
            .then(r => { dispatch(stats.setStat('totals', r.data)); });
        }
    },
}