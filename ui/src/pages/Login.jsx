import React, { useContext, useState } from 'react'
import "./login.css";
import toast from 'react-hot-toast';
import axiosInstance from '../context/AxiosInstance';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';


const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(true);
    const { handleLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(`/api/${isRegistering ? '/register' : 'login'}`, formData);

            console.log("Your data is ", data);

            if (data.error) {
                console.error(data.error);
                setError(data.error);
                toast.error(data.error);
                return;
            }

            toast.success(isRegistering ? "Sucessfully registered" : "Successfully logged in");

            // Clear fields in formData 
            setFormData({
                email: "",
                fullName: "",
                password: "",
            });
            setError("");

            if (isRegistering === false) {
                // console.log("IsRegistering is false:", isRegistering);
                // perform your login functionality here
                handleLogin(data?.token, data);
                navigate("/admin");
            }

        } catch (error) {
            console.error("Error submitting form data", error);
            toast.error(error.toString());
        }
    }


    return (
        <>
            <div className='login' >
                <h2 className='tittleBar'>
                    <NavLink onClick={() => { setIsRegistering(true) }}>Register </NavLink>/
                    <NavLink onClick={() => { setIsRegistering(false) }} > Login </NavLink>
                </h2>

                {isRegistering ?
                    // Display Register by default. 
                    (<form className='registerForm' onSubmit={handleSubmit}>
                        {error && <p className='errorMessage'>{error}</p>}

                        <input className='theInputes' type="email" name="email"
                            placeholder='Enter Email ...' autoComplete=''
                            value={formData.email} onChange={handleChange} required
                        />
                        <input className='theInputes' type="text" name="fullName"
                            placeholder='Enter fullname here ...' autoComplete=''
                            value={formData.fullName} onChange={handleChange} required
                        />
                        <input className='theInputes' type="password" name="password"
                            placeholder='Enter password ...' autoComplete=''
                            value={formData.password} onChange={handleChange} required
                        />
                        <button className='registerBtn' type='submit' >Register</button>
                    </form>) :

                    // When Login link is clicked. dispaly this
                    (<form className='loginForm' onSubmit={handleSubmit}>
                        {error && <p className='errorMessage'>{error}</p>}

                        <input className='theInputes' type="email" name="email"
                            placeholder='Enter Email ...' autoComplete=''
                            value={formData.email} onChange={handleChange} required
                        />
                        <input className='theInputes' type="password" name="password"
                            placeholder='Enter Password ...' autoComplete=""
                            value={formData.password} onChange={handleChange} required
                        />
                        <button className='registerBtn' type='submit' >Login</button>
                    </form>)
                }



            </div>
        </>
    )
}

export default Login