import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loadingdiv() {
    return (
        <div className="loading   h-dvh flex justify-center  justify-items-center items-center w-full">
            <FontAwesomeIcon className='animate-spin' size='2x' icon={faSpinner} />
            <h1>Loading</h1>
        </div>
    )
}

export default Loadingdiv
