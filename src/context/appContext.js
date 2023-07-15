import React, {useState,useReducer,useContext} from 'react'
import reducer from './reducers'
import { CLEAR_ALERT, DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER,UPDATE_USER_BEGIN,UPDATE_USER_SUCCESS,UPDATE_USER_ERROR,HANDLE_CHANGE,CLEAR_VALUES,CREATE_JOB_BEGIN,CREATE_JOB_SUCCESS,CREATE_JOB_ERROR, GET_JOBS_BEGIN, GET_JOBS_SUCCESS,SET_EDIT_JOB, DELETE_JOB_BEGIN, EDIT_JOBS_BEGIN, EDIT_JOBS_SUCCESS, EDIT_JOBS_ERROR  } from "./action"
import axios from 'axios'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const Userlocation = localStorage.getItem('location')
const initialState = {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user:user?JSON.parse(user):null,
   token:token,
    userLocation:Userlocation || '',
    showSidebar:false,
    isEditing:false,
    editJobId:'',
    position:'',
    company:'',
    jobLocation:Userlocation || '',
    jobTypeOptions:['full-time','part-time','remote','internship'],
    jobType:'full-time',
    statusOptions:['interview','declined','pending'],
    status:'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages:1,
    page:1

}

const AppContext = React.createContext()
//because children is our app that we will be rendering
const AppProvider = ({children})=>{//children spelling galat to nhi chalega
    const [state,dispatch]=useReducer(reducer,initialState)

const authFetch = axios.create({
    baseURL: '/api/v1',
    headers: {
        Authorization: `Bearer ${state.token}`
    }
})

const displayAlert=()=>{
    dispatch({type:DISPLAY_ALERT})//always in usereducer dispatched an obj type of action
    clearAlert()
}
const clearAlert=()=>{
    setTimeout(()=>{
        dispatch({type:CLEAR_ALERT})
    },3000)
}

const addUsertoLocalStorage =({user,token,location})=>{
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
    localStorage.setItem('location',location)
}
const removeUserfromLocalStorage  = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
}

const registerUser =async (currentUser)=>{
    dispatch({type:REGISTER_USER_BEGIN})
    try {
        const response = await axios.post('/api/v1/auth/register',currentUser)
        console.log(response);
        const {user,token,location}= response.data
        dispatch({type:REGISTER_USER_SUCCESS,
        payload: {user,token,location}})
       // local storage later
       addUsertoLocalStorage({user,token,location})
    } catch (error) {
        console.log(error.response);
        dispatch({type:REGISTER_USER_ERROR,
        payload:{msg:error.response.data.msg}})
    }
    clearAlert()
}
const loginUser = async (currentUser)=>{
    dispatch({type:LOGIN_USER_BEGIN})
    try {
        const {data} = await axios.post('/api/v1/auth/login',currentUser)
        const {user,token,location}= data
        dispatch({type:LOGIN_USER_SUCCESS,
        payload: {user,token,location}})
       // local storage later
       addUsertoLocalStorage({user,token,location})
    } catch (error) {
        console.log(error.response);
        dispatch({type:LOGIN_USER_ERROR,
        payload:{msg:error.response.data.msg}})
    }
    clearAlert()
}
const toggleSidebar = ()=>{
    dispatch({type:TOGGLE_SIDEBAR})
}
const logoutUser = ()=>{
    dispatch({type:LOGOUT_USER})
    removeUserfromLocalStorage()
}

const updateUser = async (currentUser)=>{
    dispatch({type:UPDATE_USER_BEGIN})
try {
        const {data}=await authFetch.patch('/auth/updateUser',currentUser)
        const {user,location,token}=data


        dispatch({type:UPDATE_USER_SUCCESS,payload:{user,location,token}})
        addUsertoLocalStorage({user,location,token})
} catch (error) {
    dispatch({type:UPDATE_USER_ERROR,payload:{msg:error.response.data.msg}})
}
clearAlert()
}
const handleChange = ({name,value}) =>{
dispatch({
    type:HANDLE_CHANGE,
    payload:{name,value}
})
}
const clearValues  = () =>{
    dispatch({type:CLEAR_VALUES})
}
const createJob = async ()=>{
    dispatch({
        type:CREATE_JOB_BEGIN
    })
    try {
        const {position,company,jobLocation,jobType,status} = state
        await authFetch.post('/jobs',{
            position,company,jobLocation,jobType,status
        })
        dispatch({
            type:CREATE_JOB_SUCCESS
        })
        dispatch({
            type:CLEAR_VALUES
        })
    } catch (error) {
        if(error.response.status===401)
        return
        dispatch({
            type:CREATE_JOB_ERROR,payload:{msg:error.response.data.msg}
        })
    }
    clearAlert()
}
const getJobs = async ()=>{
    let url='/jobs'

    dispatch({type:GET_JOBS_BEGIN})
    try {
        const {data} = await authFetch(url)
        const {jobs,totalJobs,numOfPages}=data
        dispatch({
            type:GET_JOBS_SUCCESS,
            payload:{jobs,totalJobs,numOfPages}
        })
    } catch (error) {
        console.log(error);
    }
    clearAlert()
}
const setEditJob = (id)=>{
    dispatch({type:SET_EDIT_JOB,payload:{id}})
    // console.log(`set edit job ${id}`);
}
const editJob = async ()=>{
dispatch({
    type:EDIT_JOBS_BEGIN
})
try {
    const {position,company,jobLocation,jobType,status}=state
    await authFetch.patch(`/jobs/${state.editJobId}`,{
        position,company,jobLocation,jobType,status//incase the value needs to be given
    })
    dispatch({
        type: EDIT_JOBS_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });//because we don't want edited values to be still after edit success
} catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: EDIT_JOBS_ERROR,
      payload: { msg: error.response.data.msg },
    });
}
clearAlert();
}
const setDeleteJob = async (jobId)=>{
    dispatch({type:DELETE_JOB_BEGIN})
    try {
        await authFetch.delete(`/jobs/${jobId}`)
        getJobs()
    } catch (error) {
        logoutUser()
    }
}
    return <AppContext.Provider value={{...state,displayAlert,registerUser,loginUser,toggleSidebar,logoutUser,updateUser,handleChange,clearValues,createJob,getJobs,setEditJob,setDeleteJob,editJob}}>
        {children}
    </AppContext.Provider>
}
const useAppContext=()=>{//use nhi likho ge to andar usecontext use nhi hosakta
    return useContext(AppContext)
}
export {AppProvider,initialState,useAppContext}