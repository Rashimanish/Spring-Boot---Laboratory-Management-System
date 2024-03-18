import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, FormControl, Modal } from 'react-bootstrap';
import './component.css';
import axios from 'axios';

const TestForm = () => {
    const [testName, setTestName] = useState('');
    const [price, setPrice] = useState('');
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/tests/viewall');
            setTests(response.data);
            setFilteredTests(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error fetching tests');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!testName.trim() || !price.trim()) {
            setErrorMessage('Please enter a valid test name and price.');
            return;
        }
        try {
            await axios.post('http://localhost:8084/api/tests/addtest', {
                testName: testName,
                price: parseFloat(price)
            });
            setTestName('');
            setPrice('');
            fetchTests();
            setErrorMessage('');
            setSuccessMessage('Test added successfully');
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
            setSuccessMessage('Test deleted successfully');
        } catch (error) {
            setErrorMessage('Error deleting test');
        }
    };

    const handleEdit = (test) => {
        setSelectedTest(test);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTest(null);
    };

    const handleEditSubmit = async () => {
        if (!selectedTest.testName.trim() || !selectedTest.price.trim()) {
            setErrorMessage('Please enter a valid test name and price.');
            return;
        }
        try {
            await axios.put(`http://localhost:8084/api/tests/update/${selectedTest.id}`, {
                testName: selectedTest.testName,
                price: parseFloat(selectedTest.price)
            });
            handleCloseModal();
            fetchTests();
            setErrorMessage('');
            setSuccessMessage('Test updated successfully');
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
                <Form.Group>
                    <Form.Label>Test Price:</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Add Test</Button>
            </Form>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
                        <th>Test Code</th>
                        <th>Test Name</th>
                        <th>Test Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.testCode}</td>
                            <td>{test.testName}</td>
                            <td>{test.price}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(test.id)}>
                                    Delete
                                </Button>
                                <Button variant="primary" onClick={() => handleEdit(test)}>
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
                            value={selectedTest ? selectedTest.testName : ''}
                            onChange={(e) => setSelectedTest({ ...selectedTest, testName: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Test Price:</Form.Label>
                        <Form.Control
                            type="number"
                            value={selectedTest ? selectedTest.price : ''}
                            onChange={(e) => setSelectedTest({ ...selectedTest, price: e.target.value })}
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






/*import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, FormControl, Modal } from 'react-bootstrap';
import './component.css';
import axios from 'axios';

const TestForm = () => {
    const [testCode, setTestCode] = useState('');
    const [testName, setTestName] = useState('');
    const [price, setPrice] = useState(0.0);
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
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error fetching tests');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8084/api/tests/addtest', {
                testName: testName,
                price: price
            });
            setTestCode(response.data.testCode);
            setTestName('');
            setPrice(0.0);
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
        setTestCode(selectedTest.testCode);
        setTestName(selectedTest.testName);
        setPrice(selectedTest.price);
        setSelectedTestId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTestName('');
        setTestCode('');
        setPrice(0.0);
        setSelectedTestId('');
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8084/api/tests/update/${selectedTestId}`, {
                testName: testName,
                testCode: testCode,
                price: price
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
                <Form.Group>
                    <Form.Label>Test Price:</Form.Label>
                    <Form.Control
                        type="number"
                        value={price.toString()}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
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
                        <th>Test Code</th>
                        <th>Test Name</th>
                        <th>Test Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTests.map((test) => (
                        <tr key={test.id}>
                            <td>{test.testCode}</td>
                            <td>{test.testName}</td>
                            <td>{test.price}</td>
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
                        <Form.Label>Test Code:</Form.Label>
                        <Form.Control
                            type="text"
                            value={testCode}
                            onChange={(e) => setTestCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Test Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Test Price:</Form.Label>
                        <Form.Control
                            type="number"
                            value={price.toString()}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
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


*/




















































