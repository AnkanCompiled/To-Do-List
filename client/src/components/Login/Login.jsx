import { useState } from "react"
import { useEffect } from 'react';
import './Login.css'

const SERVER = 'http://localhost:3000/logins'

const emailRegex =  /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
const nameRegex = /^(?! )[A-Za-z]+(?: [A-Za-z]+)*[A-Za-z]$/
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

var email, name, password, emailWriteTimeout

async function findData(checkEmail){
    const res = await fetch(`${SERVER}/find?${new URLSearchParams({email: checkEmail})}`).catch()
    const data = await res.json().catch()
    if  (data != null){
        return false
    }else{
        return true
    }
}

async function addToLoginMongo(){
    await fetch(`${SERVER}?${new URLSearchParams({email: email, name:name, password:password})}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body : JSON.stringify({status: 'send'})
    }).catch(window.location.reload())
    
    return true
}
async function matchWithMongo(matchEmail,matchPass){
    const res = await fetch(`${SERVER}/find?${new URLSearchParams({email: matchEmail})}`).catch()
    const data = await res.json().catch()
    if  (matchPass != data['password']){
        return false
    }else{
        let localeSaveItems = {'id': data['_id'], 'name': data['name']}
        localStorage.setItem('userinfo',JSON.stringify(localeSaveItems))
        return true
    }
}

function Login({choice}){
    const nameHtml = <div className="login-div"><input className="login-input" onChange={nameChange} placeholder="Name"/></div>,
        [emailError, newEmailError] = useState(),
        [passError, newPassError] = useState(),
        [buttonDisable, buttonVisible] = useState(true),
        [submitButtonAttribute, changeSubmitButtonAttribute] = useState('submit-button-disable')

    useEffect(() => {
        email="", name="", password="", newEmailError(), newPassError(),buttonVisible(true), changeSubmitButtonAttribute('submit-button-disable');
    }, [choice]);
    
    
    
    
    function emailChange(event){
        clearTimeout(emailWriteTimeout)
        newEmailError()
        if(emailRegex.test(event.target.value)){
            emailWriteTimeout = setTimeout(async()=>{
                if(choice == 'Register'){
                    if(await findData(event.target.value)){
                        email = await event.target.value
                        checkButton()
                    }else{
                        buttonVisible(true)
                        changeSubmitButtonAttribute('submit-button-disable')
                        email = ''
                        newEmailError(<label className="login-label">Email already registered</label>)
                    }
                }else {
                    if(await findData(event.target.value)){
                        buttonVisible(true)
                        changeSubmitButtonAttribute('submit-button-disable')
                        email = ''
                        newEmailError(<label className="login-label">Email not Registered</label>)
                        
                    }else{
                        email = await event.target.value
                        checkButton()
                    }
                }
                
            },500)
        }else{
            buttonVisible(true)
            changeSubmitButtonAttribute('submit-button-disable')
            email = ''
            newEmailError(<label className="login-label">Enter Correct Email Syntax</label>)
        }
    }
    function nameChange(event){
        if(nameRegex.test(event.target.value)){
            name = event.target.value
            checkButton()
        }else{
            buttonVisible(true)
            changeSubmitButtonAttribute('submit-button-disable')
            name = ''
        }
    }

    function passChange(event){
        newPassError()
        if(passRegex.test(event.target.value)){
            password = event.target.value
            checkButton()
        }else{
            buttonVisible(true)
            changeSubmitButtonAttribute('submit-button-disable')
            password = ''
            newPassError(<label className="login-label">Password must be 8 digit with letters and numbers</label>)
        }
    }
    async function submitFunc(){
        if(choice == 'Register'){
            if (await addToLoginMongo()){
                window.location.reload()
            }
        }else{
            if(await matchWithMongo(email,password)){
                window.location.reload()
            }else{
                newPassError(<label className="login-label">Password did not match</label>)
            }
        }
    }
    function checkButton(){
        const nameChoose = choice=='Register'?name:true
        if(email && nameChoose && password){
            buttonVisible(false)
            changeSubmitButtonAttribute('submit-button-enable')
        }
        else{
            buttonVisible(true)
            changeSubmitButtonAttribute('submit-button-disable')
        }
    }
    
    return(
        <div className="login-main-div">
            <h3 className="login-h3">{choice}</h3>
            <div className="login-div"><input className="login-input" onChange={emailChange} placeholder="Email"/>{emailError}</div>
            {choice === 'Register' ? nameHtml : null}
            <div className="login-div"><input className="login-input" onChange={passChange} type="password" placeholder="Password"/>{passError}</div>
            <div className="login-div"><button className={submitButtonAttribute} onClick={submitFunc} disabled={buttonDisable}>{choice == 'Register' ? 'Sign Up' : 'Sign In'}</button></div>
        </div>
    )
}

export default Login