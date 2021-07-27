import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actions/auth.action';
import './_loginscreen.scss'


function LoginScreen() {

    const dispatch = useDispatch();
    const loginHandler= () =>{
        dispatch(login());
    }

    const authState = useSelector(state => state.auth);
    const history = useHistory();
    useEffect(()=>{
        if(authState.accessToken){
            history.push("/");
        }
    },[authState.accessToken,history]);

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://www.freeiconspng.com/uploads/hd-youtube-logo-png-transparent-background-20.png" alt="" />
                <button onClick={loginHandler} >Login With Google</button>
                <p>A youtube clone project made using YouTube-Api</p>
            </div>
        </div>
    )
}

export default LoginScreen
