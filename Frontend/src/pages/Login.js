import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Contexts/UserContext'
import { Form, Input, message } from 'antd';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()


  const handleSubmit = async () => {
    // e.preventDefault()
    try {
      const { data } = await axios.post("/api/v1/auth/login", { email, password })
      if (data.success) {
        setAuth({
          ...auth,
          user: data.user
        })

        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/");
        console.log(data.message)
        message.success(data.message)
        navigate('/')
      } else {
        message.error(data.message)
      }

    } catch (error) {
      message.error('something went wrong')
    }
  }
  return (
    <div>


      <div className="container">
        <div className="row d-flex justify-content-center p-3">
          <div className="col-md-4 ">
            <Form className='transForm' layout="vertical" onFinish={handleSubmit}>
              <h1 className='text-center mb-3'>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" onChange={(e) => setEmail(e.target.value)} required/>
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input.Password type="password" onChange={(e) => setPassword(e.target.value)} required/>
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/register">Not a user ? Cleck Here to regsiter</NavLink>
                <button className="btn btn-primary addtransbtn">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
