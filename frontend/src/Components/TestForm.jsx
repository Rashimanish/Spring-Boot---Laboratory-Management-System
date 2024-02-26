import React, { useState , useEffect} from 'react';
import { Form, Button , Alert, Table, FormControl } from 'react-bootstrap';
import './component.css';
import axios from 'axios';

const TestForm = () => {
    const [testName, setTestName] = useState(''); // Define testName state variable
    const [successMessage, setSuccessMessage] = useState(''); // Define success message state variable
    const [testCode, setTestCode] = useState('');
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/tests/viewall');
            setTests(response.data);
            setFilteredTests(response.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to add new test
            const response = await axios.post('http://localhost:8084/api/tests/addtest', {
                testName: testName,
            });

            // Handle success response
            console.log('Test added successfully:', response.data);
            setSuccessMessage('Test added successfully'); // Set the success message
            setTestCode(response.data.testCode); 
            setTestName(''); 
            fetchTests(); 
        } catch (error) {
            // Handle error
            console.error('Error adding test:', error);
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchKeyword(keyword);
        const filtered = tests.filter((test) =>
            test.testName.toLowerCase().includes(keyword)
        );
        setFilteredTests(filtered);
    };

    return (
        <div>
           <Form onSubmit={handleSubmit}>
    <Form.Group>
        <Form.Label>Test Name:</Form.Label>
        <Form.Control
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
        />
    </Form.Group>
    <Button type="submit">Add Test</Button>
    </Form>
         {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {testCode && <p>Test Code: {testCode}</p>}
        <Form className="mt-4">
                <FormControl
                    type="text"
                    placeholder="Search by Test Name"
                    className="mr-sm-2"
                    value={searchKeyword}
                    onChange={handleSearch}
                />
            </Form>

            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Code</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.testName}</td>
                            <td>{test.testCode}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TestForm;






/*import React, { useState } from 'react';
import './component.css';
import axios from 'axios';

const TestForm = () => {
    const [testName, setTestName] = useState(''); // Define testName state variable
    const [successMessage, setSuccessMessage] = useState(''); // Define success message state variable
    const [testCode, setTestCode] = useState(''); // Define test code state variable

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to add new test
            const response = await axios.post('http://localhost:8084/api/tests/addtest', {
                testName: testName // Use the value of testName state variable
            });

            // Handle success response
            console.log('Test added successfully:', response.data);
            setTestCode(response.data.testCode); // Set the test code in state
            setSuccessMessage('Test added successfully'); // Set the success message
        } catch (error) {
            // Handle error
            console.error('Error adding test:', error);
            setSuccessMessage(''); // Clear success message if there's an error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)} // Update testName state variable
                />
                <button type="submit">Add Test</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {testCode && <p>Test Code: {testCode}</p>}
        </div>
    );
};

export default TestForm;
*/