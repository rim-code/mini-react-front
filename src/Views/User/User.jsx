
// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchOutlined } from '@ant-design/icons'
import "./User.css";
import { Modal } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'   css antdesign
import Card from "../../components/Card/Card";
import Alert from "../../components/Alert";

import { useNavigate } from 'react-router-dom'


const User = () => {

    //state modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate()

    const showModal = () => {
        setIsModalVisible(true);
    };



    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //add new user
    const [issucess, setissucess] = useState(false); //alert issucces on cas d'ajout

    const handleOk = () => {
        // setIsModalVisible(false);

        axios.post('http://localhost:5000/api/user/', user).then(res => {
            console.log(res.data);
            setissucess(true)

            let arr = [...users] //na3mel copie men state users wnhotha fi arr how to push object in array state 
            arr.push(res.data.data)
            setUsers(arr)
            //rest state apres l'ajout retour a l'etat initial 
            setUser({
                name: "",
                username: "",
                email: "",
                city: "",
                street: ""
            });

            handleCancel();  //fermer modal apres ajout

            setTimeout(() => {
                setissucess(false)
            }, 3000);

        })
        // console.log(user);
    };





    // const handleOk = () => {
    //     // setIsModalVisible(false);

    //     axios.post('http://localhost:5000/api/user/',user).then(res => {

    //     console.log(res.data); 

    //      if (res.status ===  201){
    //         setIserror(false)
    //         setErrors([])
    //         let arr = [...users] //na3mel copie men state users wnhotha fi arr how to push object in array state 
    //         arr.push(res.data.data)  
    //         setUsers(arr)   
    //         //rest state apres l'ajout retour a l'etat initial 
    //         setUser({
    //             name: "",
    //             username: "",
    //             email: "",
    //             city: "",
    //             street: ""
    //         });
    //      }


    // })
    // .catch((err)=>{
    //     console.log(err.response);  //pour voir error 
    //     setErrors(err.respone.data.errors)
    // }

    // )

    // };





    //State 
    const [users, setUsers] = useState([]);   //state contient all users
    const [check, setCheck] = useState(false); //affichage conditional card table

    //state form add user
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        city: "",
        street: ""
    });

    //  Object Destructuring //add user 
    const { name, username, email, city, street } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    //error input vide
    // const [errors, setErrors] = useState([])
    // const [iserror, setIserror] = useState(false)

    //component error
    // const Error = ({ name }) => {
    //     return (
    //         <>
    //             {
    //                 errors.map((e, i) => {
    //                     return (
    //                         <>
    //                             {
    //                                 e.path[0] === name
    //                                 &&
    //                                 <span style={{ marginLeft: "15px", color: 'red', fontSize: '14px' }}  >{e.message}</span>
    //                             }
    //                         </>
    //                     )
    //                 })
    //             }
    //         </>
    //     )
    // }


    //get all users
    useEffect(() => {
        axios.get('http://localhost:5000/api/user/list').then(res => {
            console.log(res.data);
            setUsers(res.data.data);
        })
    }, [])



    const [isdeleted, setisdeleted] = useState(false)

    //delete user from
    const DeleteUser = (id) => {
        axios.delete(`http://localhost:5000/api/user/delete/${id}`)
            .then((result) => {
                console.log(result);  //verifier user delete mel bd
                // supprime user mel vue  fi front
                if (result.status === 200) {
                    setisdeleted(true)
                    let arr = [...users]
                    let usersfilter = arr.filter(u => u._id !== id)
                    setUsers(usersfilter)
                    setTimeout(() => {
                        setisdeleted(false)
                    }, 3000);
                }

            })
    };

    // const DeleteUser = (id) =>
    // {
    //   axios.delete(`http://localhost:5000/api/user/delete/${id}`)
    //   .then((result)=>{
    //     console.log(result);  //verifier user delete mel bd
    //   })
    //   .catch(()=>{
    //     alert('Error in the Code');
    //   });
    // };


    //search
    const searchRecords = (e) => {

        axios.get(`http://localhost:5000/api/user/search/${e.target.value}`)
            .then(response => {
                setUsers(response.data.data);
            });
    }
    //Edit user 








    return (
        <div className="Container">
            <h3 className="title">Users</h3>


            <div className="top">

                <div className="search">
                    <input onChange={searchRecords} type="text" placeholder="Search..." />
                    <SearchOutlined className="searchicon" />
                    {/* ant-design   */}
                </div>

                <div className="topLeft">
                    <i onClick={() => setCheck(true)} className="tableIcon fas fa-table"></i>
                    <i onClick={() => setCheck(false)} className="cardIcon fas fa-id-card"></i>
                </div>

            </div>

            {check ?

                <div className="tableUser">




                    {isdeleted && <>  <Alert message="user deleted" color="success" />  </>}

                    {issucess && <>  <Alert message="user dadded" color="success" />  </>}

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">City</th>
                                <th scope="col">Street</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map((user, i) => {
                                return (
                                    <tr>
                                        <th scope="row">{i}</th>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.city}</td>
                                        <td>{user.street}</td>
                                        <td><i onClick={() => DeleteUser(user._id)} className="deleteIcon far fa-trash-alt"></i>
                                            <i onClick={() => navigate(`/update/${user._id}`)} className="editIcon fas fa-edit"></i>
                                        </td>
                                    </tr>

                                )
                            })
                            }

                        </tbody>
                    </table>


                </div>
                :
                <>

                    {isdeleted && <>  <Alert message="user deleted" color="success" />  </>}

                    {issucess && <>  <Alert message="user added" color="success" />  </>}

                    <div className="row">
                        {users.map((user, i) => {
                            return (
                                <div className="col-4 mb-3"> <Card passedFunction={() => DeleteUser(user._id)} item={user} /></div>
                                //  item props
                            )
                        })
                        }
                    </div>
                </>

            }


            <div className="iconAdd">
                <button onClick={showModal} className="btn"><i class="fas fa-plus-circle"></i></button>
            </div>

            <>

                <Modal title="Add New User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>




                    <form    >
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input name="name" value={name} onChange={(e) => onInputChange(e)} type="text" className="form-control" />
                            {/* <Error name='name' /> */}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">UserName</label>
                            <input name="username" value={username} onChange={(e) => onInputChange(e)} type="text" className="form-control" />
                            {/* <Error name='username' /> */}
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email </label>
                            <input name="email" value={email} onChange={(e) => onInputChange(e)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            {/* <Error name='email' /> */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input name="city" value={city} onChange={(e) => onInputChange(e)} type="text" className="form-control" />
                            {/* <Error name='city' /> */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Street</label>
                            <input name="street" value={street} onChange={(e) => onInputChange(e)} type="text" className="form-control" />
                            {/* <Error name='street' /> */}
                        </div>

                    </form>

                </Modal>


            </>

        </div>
    )
}

export default User
