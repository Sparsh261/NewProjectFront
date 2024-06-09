import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import Modal from "./Modal";
import Cart from "./Cart"
import {useContext} from "react";
import PointsContext from "../context/pointsContext";

const Navbar = ({ setQuery }) => {

    const navigate = useNavigate();

    const contextValues = useContext(PointsContext);
    let [toSearch, settoSearch] = useState('');

    useEffect(() => {
        setQuery(toSearch)
    }, [toSearch])

    const [cartView, setCartView] = useState(false)

    const handleLogout = ()=>{
        // e.preventDefault();
        localStorage.removeItem("authTokens");
        // navigate("/login");
    }

    return (
        <div class="navbar1 ">
            <div class="nav-logo border1">
                <div class="logo">
                    <a name="top"></a>
                </div>
            </div>

            <div class="address border1">
                <p class="add-one">Deliver to</p>
                <i class="fa-solid fa-location-dot"></i>
                <p class="add-two">India</p>
            </div>

            <div>
                <Link to="/allproducts">All Products</Link>
            </div>

            <div class="nav-search-bar border1">
               
                <input type="text" placeholder="Search Amazon" value={toSearch}
                    onChange={(e) => { settoSearch(e.target.value) }} />
                <div class="search-barlogo">
                    {/* <button > */}
                        <i class="fa-solid fa-magnifying-glass"></i>
                    {/* </button> */}
                </div>
            </div>

            <div>
            {
                (!localStorage.getItem("authTokens")) ?
                    <div class="signin border1">
                        <Link to="/signup" class="line1"> Hello,Sign Up </Link>
                    </div> 
                    :
                    <div class="signin border1">
                        <Link to="/signup" class="line1 btn text-bg-primary" onClick={handleLogout}> Log out </Link>
                    </div>
            }
            </div>

            {localStorage.getItem("authTokens") ?
                <div class="cart border1 btn text-bg-primary" onClick={()=>{setCartView(true)}}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    My Cart <span className='badge badge-info text-bg-danger'>{contextValues.userPoints}</span>
                </div> : ""
            }
        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

        </div>
    )
}

export default Navbar