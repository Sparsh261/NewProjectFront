import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const Login = () => {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()

    const userlogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:1400/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                "email": e.target[0].value,
                "password": e.target[1].value
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        if (data.status === "true") {
            localStorage.setItem("authTokens", data.authToken)
            navigate('/');

        }
        else alert(data.msg)
    }

    return (
        <>

            <div className="container  w-75 mt-5 ">
                <form onSubmit={userlogin} >
                    <div className="form-group mt-5">
                        <label for="exampleInputEmail1" className="mt-5 fs-2">Email address</label>
                        <input type="email" className="form-control w-75" id="exampleInputEmail1
                        email" name="email" onChange={(e) => { setUserEmail(e.target.value) }}
                            aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted bg-light ">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1" className="mt-3 fs-2">Password</label>
                        <input type="password" className="form-control w-75" id="exampleInputPassword1 password"
                            name="password" onChange={(e) => { setUserPassword(e.target.value) }}
                            placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary mt-5">Submit</button>
                </form>
            </div>








        </>
    )
}


export default Login