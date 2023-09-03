import axios from "axios";
import {message} from 'antd'

export const userLogin = (reqObj) => async dispatch => {
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.post('/api/users/login' , reqObj)
        localStorage.setItem('user' , JSON.stringify(response.data))

        message.success('Login success')
        dispatch({type: 'LOADING' , payload:false})
        //console.log(response) ;
        setTimeout(() => {
            window.location.href='/'
        }, 500);

    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.post('/api/users/register' , reqObj) ;

        setTimeout(() => {
            window.location.href='/login'
        }, 500);
       
        message.success('Registration successfull') ;
        dispatch({type: 'LOADING' , payload:false}) ;
          
    } catch (error) {

        console.log(error) ;
        message.error('Something went wrong') ;
        dispatch({type: 'LOADING' , payload:false}) ;

    }
}