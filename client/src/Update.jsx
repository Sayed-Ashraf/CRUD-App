  import axios from 'axios';
  import React, { useState, useEffect } from 'react'
  import {Link, useNavigate} from "react-router-dom"
  import { useParams } from 'react-router-dom';


  const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [values, setValues] = useState({
      name: "",
      email: ""
    })
    useEffect(() => {
      axios(`http://localhost:8001/read/${id}`)
        .then(res => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setValues(res.data[0]);
          } else {
            // Handle the case where the data is not as expected
            console.log('Invalid data format:', res.data);
          }
        })
        .catch(err => console.log(err));
    }, [id]); // Include id as a dependency to rerun the effect when id changes
    

    const handleUpdate = (e) => {
      e.preventDefault()
      console.log(values);
      axios.put(`http://localhost:8001/updateUser/${id}`, values) 
      .then(res => {
        console.log(res);
        navigate("/")
      }) 
      .catch(err => console.log(err))
    }

      return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleUpdate}>
              <h2>Update User</h2>
              <div className="mb-2">
                <label htmlFor="">Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  value={values.name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  value={values.email}
                />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Update
              </button>
              <Link to="/" className='btn btn-primary'>Back</Link>
            </form>
          </div>
        </div>
      );
    }

  export default Update