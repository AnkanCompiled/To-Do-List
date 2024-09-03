import { useEffect, useState } from "react"
import './Display.css'

const SERVER = 'http://localhost:3000/data'
const local = JSON.parse(localStorage.getItem('userinfo'))

var head, date, time, body

function Display({titleprop,dateprop,timeprop,contentprop,listid}){
    const [titleValue, setTitleValue] = useState(),
            [buttons, setButtons] = useState(),
            [dateValue, setDateValuee] = useState(),
            [timeValue, setTimeValue] = useState(),
            [contentValue, setContentValue] = useState()
        
    useEffect(() => {
        if (titleprop==undefined){
            head='',date='',time='',body='' 
            setTitleValue('')
            setDateValuee('')
            setTimeValue('')
            setContentValue('')
            setButtons(<button className="upload-button" onClick={uploadClick}>Upload</button>)
        }else{
            head=titleprop
            date=dateprop?dateprop:undefined
            time=timeprop?timeprop:undefined
            body=contentprop?contentprop:undefined
            setButtons(<><button className="edit-button" onClick={editClick}>Edit</button><button className="delete-button" onClick={deleteClick}>Delete</button></>)
            setTitleValue(titleprop)
            setDateValuee(dateprop)
            setTimeValue(timeprop)
            setContentValue(contentprop)
        }
        
    }, [titleprop]);

    async function addListToMongo() {
        try{
            await fetch(`${SERVER}/list?${new URLSearchParams({id: local['id']})}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method : 'POST',
                body : JSON.stringify({"title" : head,"date" : date,"time" : time, "content" : body})
                
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                }
            })
            
        }catch(err){
            console.log('List Entry Error')
        }
    }
    async function updateListToMongo(){
        try{
            await fetch(`${SERVER}/update?${new URLSearchParams({id: local['id'], listid: listid})}`,{
            headers: {
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({"title" : head,"date" : date,"time" : time, "content" : body})
            
            })
            .then(response=>{
                if (response.ok){
                    window.location.reload()
                }
            })
        }catch(err){
            console.log('List not found')
        }
    }

    async function deleteListFromMongo() {
        try{
            await fetch(`${SERVER}/delete?${new URLSearchParams({id: local['id'], listid: listid})}`)
            .then(response=>{
                if (response.ok){
                    window.location.reload()
                }
            })
        }catch(err){
            console.log('List not found')
        }
    }

    async function uploadClick(){
        if(head){
            await addListToMongo()
        }
    }

    async function editClick(){
        if(head){
            console.log('updating')
            await updateListToMongo()
        }
    }
    async function deleteClick(){
        await deleteListFromMongo()
    }

    function headEnter(event){
        setTitleValue(event.target.value)
        head = event.target.value
    }
    function dateEnter(event){
        setDateValuee(event.target.value)
        date = event.target.value
    }
    function timeEnter(event){
        setTimeValue(event.target.value)
        time = event.target.value
    }
    function bodyEnter(event){
        setContentValue(event.target.value)
        body = event.target.value
    }
    

    return(
        <div className="content-div">
        <>
            <div><textarea onChange={headEnter} defaultValue={titleValue} className="display-title"  placeholder="Title"/></div>
            <div>
                <label className="display-label">DATE </label><input onChange={dateEnter} defaultValue={dateValue} type="date" className="display-datetime"/>
                <label className="display-label">TIME </label><input onChange={timeEnter} defaultValue={timeValue} type="time" className="display-datetime"/>
            </div>
            <div><textarea onChange={bodyEnter} defaultValue={contentValue} className="display-content" placeholder="Content"/></div>
            <div className="display-button-div">{buttons}</div>
            </>
        </div>
    )
}

export default Display