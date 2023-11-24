import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Contexts/UserContext';
import { Select, DatePicker, message, Spin } from 'antd';
import Analytics from './Analytics';

function Home() {
  const [data, setData] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const { RangePicker } = DatePicker;


  // Getting All Transection (calling it initially using useeffect hook)

  const getAllTransections = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("auth"));
      const userID = user.user._id
      const { data } = await axios.post("/api/v1/transation/alltransation", {
        userid: userID,
        frequency,
        selectedDate,
        type
      });
      setLoading(false);
      const transitionData = data.transections;
      console.log(data, 'home data');
      setData(transitionData);

    } catch (error) {
      setLoading(false);
    }
  };

  // USEEFFECT HOOK
  useEffect(() => {
    getAllTransections();
  }, [frequency, type, selectedDate]);

  // DELECT HANDALER 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/transation/deletetransation/${id}`);
      console.log('Deleted');
      getAllTransections();
      message.success('Transactions deleted successfully');
    } catch (error) {
      console.log('Deleted error:', error);
    }
  };

  return (
    < >
      <div className='container'>
        <div className='row d-flex justify-content-center'>
            {auth.user ? (<h4 className = "textHeading">welcome <b style={{color:'darkslateblue',textTransform:'capitalize'}}>{auth.user.name}</b></h4>) : " "}

          <div className='row filterRow'>
            <div className='col-md-2 frequencyfilter mt-2'>
              <h6>select frequency</h6>
              <Select className='filterDiv' value={frequency} onChange={(e) => setFrequency(e)}>
                <Select.Option value="7">Last one week</Select.Option>
                <Select.Option value="30">Last one Month</Select.Option>
                <Select.Option value="365">Last one Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(e) => setSelectedDate(e)} />)}

            </div>
            {/* <div className='col-md-2 typefilter mt-2'>
              <h6>select Type</h6>
              <Select className='filterDiv' value={type} onChange={(e) => setType(e)} disabled>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
              {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(e) => setSelectedDate(e)} />)}

            </div> */}
            <div className='col-md-2 tablegraphIconsColum typefilter mt-2'>
              <div >
                <h6>Table</h6>
                <i className={`mx-2 fa-sharp fa-solid fa-list ${viewData === "table" ? 'activeIcon' : 'inactiveIcon'}`}
                  onClick={() => setViewData('table')}>
                </i>
              </div>
              <div>
                <h6>Analytics</h6>
                <i className={`mx-2 fa-solid fa-chart-simple ${viewData === "analytics" ? 'activeIcon' : 'inactiveIcon'}`}
                  onClick={() => setViewData('analytics')}>
                </i>
              </div>
            </div>
            <div className='col-md-2 mt-2'>
              <NavLink className='btn btn-info addmoreBtn' to='/add'>Add Transection</NavLink>

            </div>
          </div>
<div className='spiner'>
          {loading && <Spin size='large'/>}
</div>
          <div className='row'>
            <div className='col-md-12 tableColum'>
            {viewData === 'table' ? (
              <table className="table  table-hover">
                <thead>
                  <tr>
                    <th><h6 className='thHome'>Date</h6></th>
                    <th><h6 className='thHome'>Type</h6></th>
                    <th><h6 className='thHome'>Category</h6></th>
                    <th><h6 className='thHome'>Amount</h6></th>
                    <th><h6 className='thHome'>Reference</h6></th>
                    <th><h6 className='thHome'>Description</h6></th>
                    <th><h6 className='thHome'>Action</h6></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((t) => (

                    <tr key={t._id}>
                      <td><h6 className='tdHome'>{new Date(t.date).toISOString().slice(0, 10)}</h6></td>
                      <td><h6 className='tdHome'>{t.type}</h6></td>
                      <td><h6 className='tdHome'>{t.category}</h6></td>
                      <td><h6 className='tdHome'>{t.amount}</h6></td>
                      <td><h6 className='tdHome'>{t.refrence}</h6></td>
                      <td><h6 className='tdHome'>{t.description}</h6></td>
                      <td>

                      <button className='btn btn-danger m-1' style={{background:'transparent' , border:'none'}} onClick={() => { handleDelete(t._id) }}>
                        <i className="fa-solid fa-trash-can" />
                        </button>
                     
                      <NavLink className='btn btn-warning 'style={{background:'transparent' , border:'none'}} to={`/edit/${t._id}`}>
                        <i className="fa-solid fa-pen" />
                        </NavLink>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>
            ) : (<Analytics alltransections={data} />)}
</div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Home
