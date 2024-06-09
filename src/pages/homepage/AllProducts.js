
import Card from './card'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Modal from "./Modal";
import Cart from './Cart';
import {useContext} from "react";
import PointsContext from "../context/pointsContext";

const AllProducts = () => {


    const navigate = useNavigate();

    const contextValues = useContext(PointsContext);
    const [data, setData] = useState([]);
    const [cartView, setCartView] = useState(false)
    const getData = async () => {
        const res = await fetch('http://localhost:1400/products', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json()).then(r => {
                setData(r.data.product);
            })
            .catch((err) => console.log(err))

    }
    useEffect(() => { getData() }, [])


    return (
        <>
            <div className="container mt-5 allproducts bg-secondary ">

                <div className='d-flex align-items-center justify-content-between'>
                    <h2 className='fs-1 ms-5' >All Products</h2>
                    <div>
                        {localStorage.getItem("authTokens") ?
                            <div class="cart border1 me-5 fs-5 text-bg-primary btn" onClick={() => { setCartView(true) }}>
                                <i class="fa-solid fa-cart-shopping"></i>
                                My Cart <span className='badge badge-info text-bg-danger'>{contextValues.userPoints}</span>
                            </div> : ""
                        }
                        {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                        <div class="cart border1 me-5 fs-5 text-bg-primary btn" onClick={() => { navigate('/') }}>
                            Home
                        </div>
                    </div>

                </div>

                <div className="content">

                    {data.map(elem => {
                        return (
                            <div key={elem._id}>
                                <Card elem={elem} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AllProducts