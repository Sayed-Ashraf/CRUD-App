import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


function Home() {
    const [data,setData] = useState([])
    const getData = async () => {
        const res = await axios('http://localhost:8001')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        getData()
    }, [])
    const deleteUser = async(id) => {
        try {
            await axios.delete(`http://localhost:8001/deleteUser/${id}`)
            getData()
    } 
        catch (error) {
            console.log("error", error);
    }

    }   

  return (
    <div className='container-fluid bg-dark  vh-100 d-flex justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Users List</h2>
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-primary' to="/create">Create +</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                    return(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <Link to={`/Read/${item.id}`} className="btn btn-info me-2">Read</Link>
                                <Link to={`/edit/${item.id}`} className="btn btn-success me-2">Edit</Link>
                                <Link to="" className="btn btn-danger" onClick={() => deleteUser(item.id)}>Delete</Link>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home