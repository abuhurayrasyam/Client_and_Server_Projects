import React from 'react';
import { useLoaderData } from 'react-router';

const UsersDetails = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            
        </div>
    );
};

export default UsersDetails;