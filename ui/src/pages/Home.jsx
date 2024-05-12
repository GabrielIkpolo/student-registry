import React, { useState, useEffect } from 'react';
import "./home.css";
import axiosInstance from '../context/AxiosInstance';
import toast from "react-hot-toast";

const Home = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState("");
    const [levels, setlevels] = useState(['100L', '200L', '300L', '400L', '500L']);
    const [matriculationNumber, setMatriculationNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [departments, setDepartments] = useState({});

    // Fetch departments from backend when component mounts
    const fetchDepartments = async () => {
        try {
            const { data } = await axiosInstance.get('/the-department');
            // console.log(data);
            setDepartments(data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };


    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/student', {
                email,
                fullName,
                department,
                level: level,
                matriculationNumber,
                phoneNumber,
            });

            // Clear form fields after successful registration
            setEmail('');
            setFullName('');
            setDepartment('');
            setLevel('');
            setMatriculationNumber('');
            setPhoneNumber('');

            // alert('Student registered successfully!');
            toast.success("You have registered successfully");


        } catch (error) {
            console.error('Error registering student:', error);
            toast.error('An error occurred while registering student.');
        }
    };

    return (
        <>
            <div className='home'>
                <h2 className='registerTitle'>Student Registry</h2>

                <form onSubmit={handleSubmit}>

                    <label>
                        Email*:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>

                    <label>
                        Full Name*:
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </label>

                    <label>
                        Department*:
                        <select className='deptSelect' value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option className='deptSelect' value="">Select Department</option>
                            {/* {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))} */}

                            {Object.entries(departments).map(([key, value]) => (
                                <option key={key} >{departments[key]}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Level*:
                        <select className="levelSelect" value={level}
                            onChange={(e) => setLevel(e.target.value)} required >
                            <option value="">Select Level</option>
                            {levels.map((l) => (
                                <option key={l} value={l} >{l}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Matriculation Number:
                        <input type="text" value={matriculationNumber} onChange={(e) => setMatriculationNumber(e.target.value)} required />
                    </label>


                    <label>
                        Phone Number:
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </label>

                    <button className='submitBtn' type="submit">Register</button>
                </form>
            </div>
        </>
    );
};

export default Home;
