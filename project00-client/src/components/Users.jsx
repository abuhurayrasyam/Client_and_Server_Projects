import React, { use, useState } from 'react';

const Users = ({usersPromise}) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);
    console.log(users);

    const handleAddUser = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = {name, email};
        console.log(user);

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => 
            {
                console.log(data);
                const newUsers = [...users, data];
                setUsers(newUsers);
                e.target.reset();
            });
    }

    return (
        <div>
            <h1>Users</h1>
            {
                users.map(user => <p key={user.id}>{user.name} : {user.email}</p>)
            }
            <form onSubmit={handleAddUser} action="">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default Users;