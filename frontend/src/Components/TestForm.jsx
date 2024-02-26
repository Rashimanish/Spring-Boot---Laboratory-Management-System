import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, FormControl, Modal } from 'react-bootstrap';
import './component.css';
import axios from 'axios';

const TestForm = () => {
    const [testName, setTestName] = useState('');
    const [testCode, setTestCode] = useState('');
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/tests/viewall');
            setTests(response.data);
            setFilteredTests(response.data);
        } catch (error) {
            setErrorMessage('Error fetching tests');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8084/api/tests/addtest', {
                testName: testName,
            });
            setTestCode(response.data.testCode);
            setTestName('');
            fetchTests();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error adding test');
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8084/api/tests/delete/${id}`);
            fetchTests();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error deleting test');
        }
    };

    const handleEdit = (id) => {
        const selectedTest = tests.find((test) => test.id === id);
        setTestName(selectedTest.testName);
        setTestCode(selectedTest.testCode);
        setSelectedTestId(id);
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        setTestName('');
        setTestCode('');
        setSelectedTestId('');
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8084/api/tests/update/${selectedTestId}`, {
                testName: testName,
                testCode: testCode,
            });
            handleCloseModal();
            fetchTests();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error updating test');
        }
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
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.testName}</td>
                            <td>{test.testCode}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(test.id)}>
                                    Delete
                                </Button>
                                <Button variant="primary" onClick={() => handleEdit(test.id)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Test Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Test Code:</Form.Label>
                        <Form.Control
                            type="text"
                            value={testCode}
                            onChange={(e) => setTestCode(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TestForm;


























































/*import React, { useState , useEffect} from 'react';
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

*/




