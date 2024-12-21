import renderer from 'react-test-renderer';
import Login from '../Login';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { store } from '../../../Store';
import reducer from '../../../Features/UserSlice';

test("Matching the UI",()=>{
    const {container}=render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    screen.debug(container);
    expect(container).toMatchSnapshot();
});

test("Validate the email using regex",()=>{
    render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    const emailInput=screen.getByLabelText(/email/i);
    const testmail="abc@gmail.com";
    //expect((emailInput.value)).toEqual(testmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //Pass case
    fireEvent.change(emailInput,{target:{value:'reem@gmail.com'}});

    //fail case
    //fireEvent.change(emailInput,{target:{value:'abcgmail.com'}});
    expect(emailRegex.test(emailInput.value)).toBe(true);
});

/*
Two uppercase letters are required.
At least one number is required.
At least one special character is required.
The password must have a minimum length of 6 characters.
*/
test("Validate the password", () => {
    render(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    // Pass case
    fireEvent.change(passwordInput, { target: { value: 'AaB@12' } });
    expect(passwordRegex.test(passwordInput.value)).toBe(true);

    // Fail case: Only one uppercase letter
    fireEvent.change(passwordInput, { target: { value: 'Abc@12' } });
    expect(passwordRegex.test(passwordInput.value)).toBe(false);

});

/*
const testInitValue = {
    user:{},
    message:"",
    isLoading:false,
    isSuccess:false,
    isError:false,
} 
test("Testing Initial State in Slice",()=>{
    expect(reducer(undefined,{type:undefined})).toEqual(testInitValue);
});
*/