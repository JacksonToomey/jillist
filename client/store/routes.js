import { getTasks } from './middleware/api/actions';

import { setItems } from './state/resource/actions';

export default {
    "/": {
        controller: () => dispatch => {
            dispatch(getTasks()).then(res => {
                dispatch(setItems(res.body));
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
}