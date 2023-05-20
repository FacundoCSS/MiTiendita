import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const Loading = () => {
    return (
        <div className='flex text-white w-[100vw] h-[100vh] bg-[#fe8405]'>
            <AiOutlineLoading3Quarters className='animate-spin h-12 w-5 m-auto'/>
        </div>
    )
};

export default Loading;