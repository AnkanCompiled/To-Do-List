import { createElement, useEffect, useState } from 'react'
import Display from '../Display/Display'
import './Dashboard.css'


const SERVER = 'http://localhost:3000/data'
const local = JSON.parse(localStorage.getItem('userinfo'))

function getList(){
    return new Promise(async(resolve, reject)=>{
        try{
            const res = await fetch(`${SERVER}/list?${new URLSearchParams({id: local['id']})}`)
            const listItems = await res.json()
            resolve(listItems)
            
        }catch(err){
            reject(err)
        }
    })
}



function Dashboard(){
    var globalItem = []

    useEffect(() => {
        addList()
    },[]);
    const [elements, setElements] = useState([]),
        [displayType,setDisplayType] = useState(<Display/>)
    async function addList(){
        const items = await getList()
        let elementList = []
        globalItem = items
        await items['entry'].forEach(item => {
            const newElement = (
                <button onClick={elementsButton} className='elements-button' key={item._id} id={item._id}>
                  <b>{item.title}</b>
                  {item.date?<p>Date: {item.date}</p>:<></>}
                  {item.time?<p>Time: {item.time}</p>:<></>}
                </button>
                );
            elementList.push(newElement)
        })
        setElements(elementList)
    }
    function createButton(){
        console.log('create')
        setDisplayType(<Display titleprop={undefined}/>)
    }
    function elementsButton(event){
        const data = globalItem.entry.find(item => item._id == event.currentTarget.id),
            title = data.title?data.title:undefined,
            date = data.date?data.date:undefined,
            time = data.time?data.time:undefined,
            content = data.content?data.content:undefined
        console.log(time)
        setDisplayType(<Display titleprop={title} dateprop={date} timeprop={time} contentprop={content} listid={event.currentTarget.id}/>)
    }
    return(
        <div className='todolist-div'>
            <div className="list-div">
                <div className='create-button-div'><button onClick={createButton} className='create-button'>CREATE</button><br/></div>
                <div className='element-button-div'>{elements}</div>
            </div>
            <div className="display-div">{displayType}</div>
        </div>
    )
}

export default Dashboard