import './Navbar.css'

function Navebar(){
    function RegisterOption(){
        return(
            <>
                <button className="btn login-btn">Login</button>
                <button className="btn signup-btn">Signup</button>
            </>
        )
    }
    return(
        <div className='navbar'>
            <div className="navbar-left">
                <h1 className="navbar-title">ToDo List</h1>
            </div>
            <div className="navbar-right">{RegisterOption()}</div>
        </div>
    )
}

export default Navebar