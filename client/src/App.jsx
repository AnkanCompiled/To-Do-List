import './App.css'
import LandingPage from './LandingPage/LandingPage'
import Navebar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard'


var loggedIn = 'false'
var id="", name

if (localStorage.length > 0){
  const data = JSON.parse(localStorage.getItem('userinfo'))
  id = data['id']
  name = data['name']
  loggedIn = 'true'
}
else{
  console.log('Not Logged In')
  name = undefined
  loggedIn = 'false'
}

function App() {
  return(
    <div className='main'>
      <div className="navebar"><Navebar name={name} logininfo={loggedIn}/></div>
      {loggedIn == 'true'? <Dashboard/>: <LandingPage/>}
    </div>
  )
}

export default App

