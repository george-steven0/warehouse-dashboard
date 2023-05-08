import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Components/Redux/Slices/AuthSLice/loginSlice";

const Login = () => {

    const data = useSelector(state=>state.login)
    const dispatch = useDispatch()
    const router = useNavigate()

    const [values, setvalues] = useState()

    const changeHandler = (e)=>{
        setvalues({...values,[e.target.name]:e.target.value})
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        
        dispatch(login(values))
    }

    // console.log(data);

    useEffect(() => {
        if(data.accessToken){
            router('/')
        }
    }, [data])
    
    return ( 
        <>
            <section className='loginWrapper'>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="">
                            Email
                        </label>

                        <input type="email" name="email" onChange={changeHandler} placeholder="email" />
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="" onChange={changeHandler} placeholder="Password" />
                    </div>

                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Login;