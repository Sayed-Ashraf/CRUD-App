import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


const Read = () => {
    const [data, setData] = useState([])
    const {id} = useParams()
    const getData = async () => {
        const res = await axios(`http://localhost:8001/read/${id}`)
        setData(res.data[0])
        console.log(res.data[0])
    }


useEffect(() => {
    getData()
}, []) 

return(
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3 text-center">           
            <h2 className='m-2'>User Details</h2>
            <h2 className='m-2'>{data.id}</h2>
            <h2 className='m-2'>{data.name}</h2>
            <h2 className='m-2'>{data.email}</h2> 
            <Link to={`/edit/${data.id}`} className='btn btn-primary me-2 m-2'>Edit</Link>
            <Link to="/" className='btn btn-info m-2'>Back</Link>
        </div>
    </div>
)
}

export default Read