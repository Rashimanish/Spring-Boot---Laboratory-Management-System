import { RequestLogger } from 'testcafe';

const logger = RequestLogger('http://localhost:8084');

fixture`Backend API Tests`
    .page`http://localhost:8084`; 

test('Retrieve All Tests', async t => {
    await t
        .navigateTo('/api/tests/viewall')
        .expect(logger.contains(record => record.response.statusCode === 200)).ok();
});

test('Retrieve Test by ID', async t => {
    await t
        .navigateTo('/api/tests/65f74c52441e44348984c46c') 
        .expect(logger.contains(record => record.response.statusCode === 200)).ok();
});

test('Add New Test', async t => {
    await t
        .navigateTo('/api/tests/addtest')
        .sendJSONRequest('post', {
            testCode: 'T003',
            testName: 'New Test',
            price: 20.0
        })
        .expect(logger.contains(record => record.response.statusCode === 201)).ok();
});

test('Update Test Data', async t => {
    await t
        .navigateTo('/api/tests/update/65f74c52441e44348984c46c') 
        .sendJSONRequest('put', {
            testName: 'Updated Test',
            price: 25.0
        })
        .expect(logger.contains(record => record.response.statusCode === 200)).ok();
});

test('Delete Test', async t => {
    await t
        .navigateTo('/api/tests/delete/65f74c52441e44348984c46c') 
        .sendJSONRequest('delete')
        .expect(logger.contains(record => record.response.statusCode === 200)).ok();
});


