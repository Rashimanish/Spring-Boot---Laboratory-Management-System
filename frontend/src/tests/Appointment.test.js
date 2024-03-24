import { Selector } from 'testcafe';
import axios from 'axios';

fixture`Appointment Component Tests`
    .page`http://localhost:3000/patient/makeAppointment`;

test('User can make an appointment successfully', async t => {
    
    await t
        .click('select[name="type"]') 
        .click('option[value="regular"]') 
        .typeText('input[type="date"]', '2024-03-29') 
        .click('select[name="test"]') 
        .click('option[value="Blood Test"]'); 

   
    const button = Selector('button').withText('Submit').with({ visibilityCheck: true })();
    await t.click(button);

    
    const appointmentData = {
        type: 'regular',
        date: '2024-03-29',
        test: 'Blood Test'
    };

    try {
        const response = await axios.post('http://localhost:8084/api/appointment/create', appointmentData);
        const { number, dateTime } = response.data;

       
        await t
            .expect(Selector('p').withText('Appointment Number: ').exists).ok()
            .expect(Selector('p').withText(/Appointment Time: .+/).exists).ok();
    } catch (error) {
        
        console.error('Error creating appointment:', error);
        
        await t.expect(error).notOk('Error creating appointment: ' + error.message);
    }
});

test('User cannot make an appointment with a past date', async t => {
    
    await t
        .typeText('input[type="date"]', '2023-01-01') 

   
    const button = Selector('button').withText('Submit');
    await t.expect(button.exists).ok({ timeout: 5000 });
    await t.click(button);

    
     await t
     .expect(Selector('p').withText('Please select a future date for the appointment.').exists).ok();

 
    await t
     .expect(Selector('p').withText('Appointment Number: ').exists).notOk()
     .expect(Selector('p').withText(/Appointment Time: .+/).exists).notOk();
});

test('User cannot make an appointment more than 1 month in advance', async t => {
    
    await t
        .typeText('input[type="date"]', '2024-04-30') 

   
    const button = Selector('button').withText('Submit').with({ visibilityCheck: true })();
    await t.expect(button.exists).ok({ timeout: 5000 });
    await t.click(button);

   
    await t
        .expect(Selector('p').withText('Appointment can be made within 1 month only!!').exists).ok();

   
    await t
        .expect(Selector('p').withText('Appointment Number: ').exists).notOk()
        .expect(Selector('p').withText(/Appointment Time: .+/).exists).notOk();
});


