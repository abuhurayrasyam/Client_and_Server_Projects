import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user = useLoaderData();

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name, email};

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                alert('data updated')
            }
        })
    }
    return (
        <div>
            <h1>Update User:- {user.name} : {user.email}</h1>
            <form onSubmit={handleUpdateUser} action="">
                <input type="text" name="name" defaultValue={user.name} />
                <input type="email" name="email" defaultValue={user.email} />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default UpdateUser;