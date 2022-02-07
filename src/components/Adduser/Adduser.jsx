import React from 'react'
import "./Addusser.css"
const Adduser = () => {
    return (
        <div className="Container">

            <h3>Add New User </h3>
            <form >

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label className="form-label">UserName</label>
                    <input type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input type="text" className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Add User</button>
            </form>


        </div>
    )
}

export default Adduser
