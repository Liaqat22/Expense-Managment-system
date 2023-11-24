import React from 'react'
import { Progress } from 'antd';


function Analytics({ alltransections }) {
    const totalTransections = alltransections.length
    const totalIncome = alltransections.filter((trans) => trans.type === 'Income')
    const incomepercent = (totalIncome.length / totalTransections) * 100

    const totalExpense = alltransections.filter((trans) => trans.type === 'Expense')
    const expensepercent = (totalExpense.length / totalTransections) * 100

    const totalFood = alltransections.filter((trans) => trans.category === 'Food')
    const Foodpercent = (totalFood.length / totalTransections) * 100

    const totalTax = alltransections.filter((trans) => trans.category === 'Tax')
    const Taxpercent = (totalTax.length / totalTransections) * 100

    const totalBike = alltransections.filter((trans) => trans.category === 'Motor Bike')
    const Bikepercent = (totalBike.length / totalTransections) * 100

    const totalFees = alltransections.filter((trans) => trans.category === 'Fees')
    const Feespercent = (totalFees.length / totalTransections) * 100

    const totalOthers = alltransections.filter((trans) => trans.category === 'Others')
    const Otherspercent = (totalOthers.length / totalTransections) * 100
    const totalBills = alltransections.filter((trans) => trans.category === 'Bills')
    const Billspercent = (totalBills.length / totalTransections) * 100
    return (
        <div>


            <div className='container'>
                <div className='row analyticRow'>
                    <div className='col-md-5'>
                        <div className='card'>
                            <div className='card-body'>
                                <h6 className='bg-secondary text-white p-2'>TotalTransections : {totalTransections}</h6>

                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item text-success"><h6>totalIncome : {totalIncome.length}</h6></li>
                                    <li className="list-group-item text-danger"><h6>totalExpense : {totalExpense.length}</h6></li>
                                    <li className="list-group-item text-danger"></li>
                                </ul>
                                <div className='d-flex justify-content-evenly mt-3'>
                                    <Progress className='mt-2' strokeColor={'green'} type='circle' percent={incomepercent.toFixed(0)} />
                                    <Progress className='mt-2' strokeColor={'red'} type='circle' percent={expensepercent.toFixed(0)} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-5'>
                        <div className='row d-flex justify-content-evenly'>
                            <div className='col-md-5 categorypercent'>
                                <h6>Food</h6>
                                <Progress strokeColor={'skyblue'} type="line" percent={Foodpercent.toFixed(0)} />
                            </div>
                            <div className='col-md-5 categorypercent'>
                                <h6>Fees</h6>
                                <Progress strokeColor={'purple'} type="line" percent={Feespercent.toFixed(0)} />
                            </div>
                            <div className='col-md-5 categorypercent'>
                                <h6>Tax</h6>
                                <Progress strokeColor={'yellow'} type="line" percent={Taxpercent.toFixed(0)} />
                            </div>
                            <div className='col-md-5 categorypercent'>
                                <h6>Bike</h6>
                                <Progress strokeColor={'silver'} type="line" percent={Bikepercent.toFixed(0)} />
                            </div>
                            <div className='col-md-5 categorypercent'>
                                <h6>Bills</h6>
                                <Progress strokeColor={'lightgreen'} type="line" percent={Billspercent.toFixed(0)} />
                            </div>
                            <div className='col-md-5 categorypercent'>
                                <h6>Others</h6>
                                <Progress strokeColor={'grey'} type="line" percent={Otherspercent.toFixed(0)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Analytics
