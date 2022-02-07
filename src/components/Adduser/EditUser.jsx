import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EditUser = () => {



    const { id } = useParams()


    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        city: '',
        street: ''
    });




    useEffect(() => {
        loadUser()
    }, []);




    const EditUser = () => {
        axios.put(`http://localhost:5000/api/user/update/${id}`, user)
            .then((result) => {
                console.log(result);

                if (result.status === 200) {
                    setUser(result.data.data)
                }

            })
    };


    //get user by id
    const loadUser = () => {

        axios.get(`http://localhost:5000/api/user/getone/${id}`)
            .then((result) => {
                console.log(result);
                setUser(result.data.data)
            })
    }

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    return (
        <div className="container">

            <div className="row mt-4">
                <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
                    <h4 className="text-center mb-4">Edit User</h4>


                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter  Name"
                            name="name"
                            value={user.name}

                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Username"
                            name="username"
                            value={user.username}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Email"
                            name="email"
                            value={user.email}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your City"
                            name="city"
                            value={user.city}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Your Street"
                            name="street"
                            value={user.street}
                            onChange={onInputChange}
                        />
                    </div>
                    <button onClick={EditUser} className="btn btn-secondary btn-block">Update User</button>

                </div>
            </div>


        </div>



    )
}

export default EditUser
