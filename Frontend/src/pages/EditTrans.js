import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Form, Input, Select, message } from 'antd';



function EditTrans() {
    const { id } = useParams()
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [category, setCategory] = useState('')
    const [refrence, setRefrence] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const navigate = useNavigate()



    const getTransections = async () => {
        try {
            const { data } = await axios.get(`/api/v1/transation/singletransection/${id}`)

            setAmount(data.amount)
            setType(data.type)
            setCategory(data.category)
            setRefrence(data.refrence)
            setDescription(data.description)
            const formatedate = new Date(data.date).toISOString().slice(0, 10)
            setDate(formatedate)


        } catch (error) {
            console.log(' error in getting transections ')

        }
    }
    useEffect(() => {
        getTransections()
    }, [])

    const handleSubmit = async () => {

        try {
          const {data} =   await axios.put(`/api/v1/transation/edittransation/${id}`, { amount, type, category, refrence, description, date })
            console.log('added')
            message.success(data.message)
            navigate('/')

        } catch (error) {
            console.log('added erorr CATCH')

        }

    }

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center p-3">
                    <div className="col-md-5 ">
                        <Form className='transForm' layout="vertical" onFinish={handleSubmit}>
                            <h1 className='text-center mb-3'>Edit Transection</h1>

                            <Form.Item >
                                <Input type="text" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </Form.Item>

                            <Form.Item >
                                <Select value={type} onChange={(e) => setType(e)} >
                                    <Select.Option value="Income">Income</Select.Option>
                                    <Select.Option value="Expense">Expense</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item >
                                {/* <Input type="email" placeholder='email' onChange={(e) => setType(e.target.value)}/> */}
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
                                <Input type="text" placeholder='Refrence' value={refrence} onChange={(e) => setRefrence(e.target.value)} />
                            </Form.Item>
                            <Form.Item>
                                <Input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Item>
                            <Form.Item >
                                <Input type="date" placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
                            </Form.Item>
                            <div >
                                <button className="btn btn-primary addtransbtn">Save</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditTrans
