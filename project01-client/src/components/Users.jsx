import { useState } from "react";
import { use } from "react";
import { Link } from "react-router";

const Users = ({usersPromise}) => {

    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = {name, email};

        //create user in db
        fetch('http://127.0.0.1:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data after creating user in db', data);
            if(data.insertedId){
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers);
                alert('Data inserted sucessfully')
                e.target.reset();
            }
        });
    }

    const handleDeleteUser = (id) => {
        console.log(id)
        fetch(`http://127.0.0.1:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
                console.log('after delete data', data);
            }
            
        })
    }

    return (
        <div>
            <h1>Users {users.length}</h1>
            <form onSubmit={handleAddUser} action="">
                <input type="text" name="name" />
                <input type="email" name="email" />
                <input type="submit" value="Add" />
            </form>
            {
                users.map(user => <h4 key={user._id}>{user.name} : {user.email} <Link to={`/users/${user._id}`}>Details</Link> <Link to={`/update/${user._id}`}>Edit</Link> <button onClick={() => handleDeleteUser(user._id)}>x</button></h4>)
            }
        </div>
    );
};

export default Users;