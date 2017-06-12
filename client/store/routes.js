import { getTasks } from './middleware/api/actions';

import { setItems } from './state/resource/actions';

export default {
    "/": {
        controller: () => dispatch => {
            dispatch(getTasks())
            .catch(e => {
                console.log(e);
            }).then(res => {
                dispatch(setItems(res.data, 'tasks'));
            })
        }
    }
}