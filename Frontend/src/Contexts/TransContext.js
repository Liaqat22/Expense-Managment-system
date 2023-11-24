import axios from 'axios'
import React, { useContext, useReducer, useEffect, createContext } from 'react'
import toast from 'react-hot-toast'
import reducer from '../Reducers/TransReducer'

const Trans = createContext()
const getAllTransation = "http://localhost:8080/api/v1/transation/alltransation"

const initialState = {
  isLoading: false,
  transitionData: []
}

function TransProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)


  const getTransections = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await axios.post(getAllTransation)
      const transitionData = data.transections
      // console.log(transitionData , 'hookdata')

      dispatch({ type: 'SET_API_DATA', payload: transitionData })

      toast.success('getting transections successfully')
    } catch (error) {
      toast.error(' error in getting transections ')
      console.log(' error in getting transections ')

    }
  }
  useEffect(() => {
    getTransections()
  }, [])
  return (
    <div>
      <Trans.Provider value={{ ...state }} >
        {children}
      </Trans.Provider>
    </div>
  )
}
const useTransHook = () => {
  return (
    useContext(Trans)
  )
}
export { TransProvider, Trans, useTransHook }
