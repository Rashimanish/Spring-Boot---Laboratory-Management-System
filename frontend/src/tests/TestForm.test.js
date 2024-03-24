import { Selector } from 'testcafe';

fixture`TestForm`.page`http://localhost:3000/admin/addTest`;

test('Add a new test', async t => {
    await t
        .typeText('input[type="text"]', 'Thyroid Test')
        .typeText('input[type="number"]', '1000')
        .click('button[type="submit"]')
        .wait(1000);

    const successAlert = Selector('.alert-success');

    await t.expect(successAlert.exists).ok();
});

test('Attempt to add a test with empty name and price', async t => {
    await t
        .click('button[type="submit"]');

    const errorMessage = Selector('.alert-danger');

    await t
        .expect(errorMessage.innerText).contains('Please enter a valid test name and price.');
});

test('Search for a test', async t => {
    await t
        .typeText('input[placeholder="Search by Test Name"]', 'Blood Test')
        .pressKey('enter');

    const testNameCell = Selector('td').withText('Blood Test');

    await t
        .expect(testNameCell.exists).ok();
});

test('Delete Test', async t => {
    
    const deleteButton = Selector('button').withText('Delete');
    const confirmDeleteButton = Selector('button').withText('Delete').nth(1);
    
    
    await t
        .click(deleteButton)
        .click(confirmDeleteButton);


   
});
















