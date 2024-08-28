import './App.css'
import Navebar from './components/Navbar/Navbar'
import InputEntry from './components/InputEntry/InputEntry'

function App() {
  return(
    <>
      <div className='navebar'>
        <Navebar/>
      </div>
      <div className='navebar'>
        <InputEntry/>
      </div>
    </>
  )
}

export default App