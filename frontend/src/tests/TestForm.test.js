import { Selector } from 'testcafe';

fixture`TestForm`.page`http://localhost:3000/admin/addTest`;

test('Add a new test', async t => {
    await t
        .typeText('input[type="text"]', 'Test Name')
        .typeText('input[type="number"]', '10')
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
        .typeText('input[placeholder="Search by Test Name"]', 'Test Name')
        .pressKey('enter');

    const testNameCell = Selector('td').withText('Test Name');

    await t
        .expect(testNameCell.exists).ok();
});

test('Delete a test', async t => {
    await t
        .click(Selector('button').withText('Delete').nth(0));

    const successAlert = Selector('.alert-success');

    await t
        .expect(successAlert.exists).ok();
});



