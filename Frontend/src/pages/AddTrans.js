import { Select, message } from 'antd';
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/UserContext';
import {  Form, Input } from 'antd';


function AddTrans() {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('select Type')
  const [category, setCategory] = useState('select category')
  const [refrence, setRefrence] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState()
  const navigate = useNavigate();
  const [auth , setAuth] = useAuth()

  const handleSubmit = async () => {

    try {
  const {data} =    await axios.post("/api/v1/transation/addtransection", { amount, type, category, refrence, description, date,userid:auth.user._id, })
      console.log('added')
      message.success(data.message)

      navigate('/')

      toast.success(' transections added successfully')
    } catch (error) {
      console.log('added erorr CATCH')

    }

  }

  return (
    <div>
<div className = "container">
  <div className = "row d-flex justify-content-center p-3">
    <div className = "col-md-5 ">
    <Form className='transForm' layout="vertical" onFinish={handleSubmit}>
          <h1 className='text-center mb-3'>Add Transection </h1>

          <Form.Item >
            <Input type="text" placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
          </Form.Item>

          <Form.Item >
            <Select  value={type} onChange={(e) => setType(e)} >
              <Select.Option  value = "Income">Income</Select.Option>
              <Select.Option  value = "Expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item >
            <Select value={category} onChange={(e) => setCategory(e)}>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Fees">Fees</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Motor Bike">Motor Bike</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Input type="text" placeholder='Refrence' onChange={(e) => setRefrence(e.target.value)}/>
          </Form.Item>
          <Form.Item>
            <Input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)}/>
          </Form.Item>
          <Form.Item >
            <Input type="date"placeholder='Date' onChange={(e) => setDate(e.target.value)}/>
          </Form.Item>
          <div >
            <button className="btn btn-success addtransbtn m-1">Save</button>
            <NavLink className="btn btn-primary addtransbtn m-1" to = '/'>Back</NavLink>
          </div>
        </Form>
    </div>
  </div>
</div>
     

    </div>
  )
}

export default AddTrans
  