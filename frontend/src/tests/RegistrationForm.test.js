import { Selector } from 'testcafe';

fixture `Registration Form`
    .page `http://localhost:3000/register`; 


    test('User can register successfully', async t => {
        
        await t.typeText('#name', 'John Doe');
        await t.typeText('#age', '30');
        await t.typeText('#contact', '0789898456');
        await t.click('#gender').click('option[value="Male"]');
        await t.typeText('#email', 'john.doe@example.com');
        await t.typeText('#username', 'johndoe');
        await t.typeText('#password', 'password');
        await t.click('#role').click('option[value="Patient"]');
        
        
        await t.click('button[type="submit"]');
    
      
        const successMessage = Selector('.alert-success');
        await t.expect(successMessage.exists).ok('Success message did not appear');
        await t.expect(successMessage.innerText).contains('Registration successful');
    });
    
    test('Submit form with incorrect email address', async t => {
        
        await t
            .typeText('#name', 'John Doe')
            .typeText('#age', '30')
            .typeText('#contact', '1234567890')
            .click('#gender')
            .typeText('#email', ' ') 
            .typeText('#username', 'johndoe')
            .typeText('#password', 'password')
            .click('#role');
    
       
        await t.click('button[type="submit"]');
        
        await t.expect(Selector('[name="email"]').hasClass('is-invalid')).ok();
    });