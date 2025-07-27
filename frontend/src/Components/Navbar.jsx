

import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css"




let Navbar = () => {

    let navigate = useNavigate();



    return (
        <>

        <div className="navbar-container">

        <h1 className="navbar-title" onClick={() => {navigate("/")}}>Subconsious.ai</h1>
        <h2 className="navbar-option" onClick={() => {navigate("/demo")}}>Demo</h2>

        </div>
        
        
        
        </>
    )
}


export default Navbar;