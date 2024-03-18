import { Selector } from 'testcafe';

fixture`Appointment Form Tests`
    .page`http://localhost:3000/patient/makeAppointment`;

test('Make appointment with valid data', async t => {
    await t
        .click(Selector('option').withText('Emergency').filterVisible()) // Select type
        .typeText('input[type=date]', '2024-04-01') // Enter date
        .click(Selector('option').withText('Edited Test Name').filterVisible()) // Select test
        .click('button'); // Click submit button
});

test('Attempt to make appointment with past date', async t => {
    await t
        .click(Selector('option').withText('Emergency').filterVisible()) // Select type
        .typeText('input[type=date]', '2022-01-01') // Enter past date
        .click('button'); // Click submit button
    await t.expect(Selector('p').withText('Please select a future date for the appointment.').exists).ok();
});

test('Attempt to make appointment with date beyond 30 days', async t => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 35); // Beyond 30 days

    const formattedFutureDate = futureDate.toISOString().split('T')[0];
    await t
        .typeText('input[type=date]', formattedFutureDate) // Enter future date beyond 30 days
        .click('button'); // Click submit button
    await t.expect(Selector('p').withText('Appointment can be made within 1 month only!!').exists).ok();
});
