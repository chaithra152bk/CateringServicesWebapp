import React from  'react';
import {BounceLoader} from 'react-spinners';


const defaultLoader = (isLoading) => {
   return ( <div className="loading">
        <BounceLoader
        sizeUnit={"px"}
        size={60}
        color={'#3949a0'}
        loading={isLoading}
        />
    </div>);
};

export const MainLoader = (props) => {
    const {isLoading} = props;
    return (
        isLoading?defaultLoader(isLoading):null
    );
};