import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()

    const userAdd = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:1400/users/signup`, {
            method: 'POST',
            body: JSON.stringify({
                "name": e.target[0].value,
                "email": e.target[1].value,
                "password": e.target[2].value
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        console.log(data)
        if (data.status === "success")
            navigate('/login');
        else alert(data.msg)
    }

    return (

        <>

            <div className="container  w-75 mt-5 ">
                <form onSubmit={userAdd} className="">
                    <div className="form-group mt-5">
                        <label for="exampleInputEmail1" className="mt-5 fs-2  ">Name</label>
                        <input type="text" className="form-control w-75" id="exampleInputEmail1 name
                        " name="name" onChange={(e) => { setUserName(e.target.value) }}
                            aria-describedby="emailHelp" placeholder="Enter name" />
                    </div>
                    <div className="form-group ">
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
                    <Link to="/login"><button className="btn btn-danger mt-5 ms-5">Already a user</button></Link>
                </form>
            </div>







        </>
    )
}

export default SignUp