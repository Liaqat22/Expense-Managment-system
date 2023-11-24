import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, NavLink } from 'react-router-dom'
import { Form, Input, message } from 'antd';



const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, { name, email, password, phone, address })
      message.success(data.message)
      navigate('/login')

    } catch (error) {
      message.error('error in registration')
    }
  }
  return (
    <>

      <div className="container">
        <div className="row d-flex justify-content-center p-3">
          <div className="col-md-5 ">
            <Form className='transForm' layout="vertical" onFinish={handleSubmit}>
              <h1 className='text-center mb-3'>Registraition Form</h1>

              <Form.Item >
                <Input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
              </Form.Item>

              <Form.Item >
                <Input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} required/>
              </Form.Item>

              <Form.Item>
                <Input.Password type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
              </Form.Item>
              <Form.Item>
                <Input type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} required/>
              </Form.Item>
              <Form.Item >
                <Input type="text" placeholder='Phone Number' onChange={(e) => setPhone(e.target.value)} required/>
              </Form.Item>
              <div className="d-flex justify-content-between align-items-center">
                <NavLink to="/login">Already have an account</NavLink>
                <button className="btn btn-primary addtransbtn">Register</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
