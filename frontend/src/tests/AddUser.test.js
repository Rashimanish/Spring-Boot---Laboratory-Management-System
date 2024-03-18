import { Selector } from 'testcafe';

fixture`Add User Form Test`
    .page`http://localhost:3000/admin/addUser`;

test('Attempt to submit the form with empty fields should display error message', async t => {
    await submitFormWithEmptyFields(t);
    await assertErrorMessageShown(t, 'Name is required.');
    await assertErrorMessageShown(t, 'Age is required.');
    await assertErrorMessageShown(t, 'Contact is required.');
    await assertErrorMessageShown(t, 'Gender is required.');
    await assertErrorMessageShown(t, 'Email is required.');
    await assertErrorMessageShown(t, 'Username is required.');
    await assertErrorMessageShown(t, 'Password is required.');
    await assertErrorMessageShown(t, 'Role is required.');
});

test('Attempt to submit the form with invalid email should display error message', async t => {
    await fillAndSubmitForm(t, {
        name: 'John Doe',
        age: '30',
        contact: '1234567890',
        gender: 'Male',
        email: 'invalid-email',
        username: 'johndoe',
        password: 'password123',
        role: 'Patient'
    });

    await t.wait(1000); // Wait for 1000 milliseconds
    await assertErrorMessageShown(t, 'Please enter a valid email address.');
});

test('Fill and submit the form with valid data should display success message', async t => {
    await fillAndSubmitForm(t, {
        name: 'John Doe',
        age: '30',
        contact: '1234567890',
        gender: 'Male',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'password123',
        role: 'Patient'
    });

    await t.wait(1000); // Wait for 1000 milliseconds
    await assertSuccessMessageShown(t);
});

async function fillAndSubmitForm(t, formData) {
    await t
        .typeText('input[name="name"]', formData.name)
        .typeText('input[name="age"]', formData.age)
        .typeText('input[name="contact"]', formData.contact)
        .click('select[name="gender"]')
        .click(Selector('option').withText(formData.gender))
        .typeText('input[name="email"]', formData.email)
        .typeText('input[name="username"]', formData.username)
        .typeText('input[name="password"]', formData.password)
        .click('select[name="role"]')
        .click(Selector('option').withText(formData.role))
        .click('button[type="submit"]');
}

async function assertErrorMessageShown(t, errorMessage) {
    await t.expect(Selector('.alert-danger').withText(errorMessage).exists).ok();
}

async function assertSuccessMessageShown(t) {
    await t.expect(Selector('.alert-success').exists).ok();
}

async function submitFormWithEmptyFields(t) {
    await t.click('button[type="submit"]');
}
