import React, { useState, useEffect } from 'react';
import axiosInstance from '../context/AxiosInstance';
import { CSVLink } from 'react-csv';
import "./adminDashboard.css";

const AdminDashboard = () => {
    const [category, setCategory] = useState('');
    const [data, setData] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(false);

    const [departments, setDepartments] = useState(['Computer Science', 'Engineering',
        'Mathematics', 'Physics', 'Biology']);
    const [department, setDepartment] = useState("");
    const [levels, setLevels] = useState(['100L', '200L', '300L', '400L', '500L']);
    const [level, setLevel] = useState("");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let response;
            switch (category) {
                case 'all':
                    response = await axiosInstance.get('/api/student');
                    break;
                case 'department':
                    // Fetch students by department
                    response = await axiosInstance.get(`/api/students/${department}`);
                    break;
                case 'level':
                    // Fetch students by level
                    response = await axiosInstance.get(`/api/students/level/${level}`);
                    break;
                default:
                    response = await axiosInstance.get('/api/student');
            }
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const dataExists = () => {
        return data && Object.keys(data).length > 0; // Check if data exists and is not empty
    }

    const handleExportCSV = () => {
        if (dataExists()) {
            // console.log("Data:", data); // Check the value of data before mapping
            if (Object.entries(data).length > 0) {
                const csvData = Object.values(data).map(student => ({
                    email: student.email,
                    fullName: student.fullName,
                    department: student.department,
                    level: student.level,
                    matriculationNum: student.matriculationNum,
                    phoneNumber: student.phoneNumber,
                }));
                return csvData;
            } else {
                console.error("Data is empty:", data);
                return [];
            }
        } else {
            return [];
        }
    };

    return (
        <>
            <div className='adminD'>
                <h2>Admin Dashboard</h2>

                {/* Level selection area  */}
                <div className='levelSelection'>
                    <select value={level} onChange={(e) => setLevel(e.target.value)} >
                        <option value={level}>Select Level</option>
                        {levels.map((lvl, index) => (
                            <option key={index} value={lvl}>{lvl}</option>
                        ))}
                    </select>
                </div>

                {/* Department selection area  */}
                <div className='departmentSelection'>
                    <select value={department} onChange={(e) => (setDepartment(e.target.value))}>
                        <option value={department}>Select Department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                {/* general Selection area  */}
                <div className='generalSelection'>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="all">All Students</option>
                        <option value="department">Students by Department</option>
                        <option value="level">Students by Level</option>
                    </select>
                    <button>
                        {dataExists() ? (
                            <CSVLink className='csvLink' data={handleExportCSV()} filename="students.csv">Export CSV</CSVLink>
                        ) : "No data"}
                    </button>
                </div>


                {/* The table data area  */}
                <div className='tableDataArea'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        dataExists() && ( // Conditional rendering of table
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Full Name</th>
                                        <th>Department</th>
                                        <th>Level</th>
                                        <th>Matriculation Number</th>
                                        <th>Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data).map(([key, value]) => (
                                        <tr key={key}>
                                            <td>{data[key].email}</td>
                                            <td>{data[key].fullName}</td>
                                            <td>{data[key].department}</td>
                                            <td>{data[key].level}</td>
                                            <td>{data[key].matriculationNum}</td>
                                            <td>{data[key].phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    )}
                </div>

            </div>
        </>
    );
};

export default AdminDashboard;

