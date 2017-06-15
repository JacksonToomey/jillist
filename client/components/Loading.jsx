import React from 'react';
import { ProgressBar } from 'react-bootstrap';


const Loading = props => {
    return (
        <div>
            <div>Loading...</div>
            <ProgressBar
                active
                now={ 100 }/>
        </div>
    )
}

export default Loading;
