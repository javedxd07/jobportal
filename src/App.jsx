import React, { Component } from 'react';
import './App.css';
import { callApi } from './api';

class App extends Component {
    constructor() {
        super();
        this.userRegistration = this.userRegistration.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);
    }

    showSignin() {
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        let popupHeader = document.getElementById("popupheader");
        popupHeader.innerHTML = "LogIn";
        let signin = document.getElementById("signin");
        let signup = document.getElementById("signup");
        signin.style.display = "block";
        signup.style.display = "none";
        username.value = "";
        password.value = "";
    }

    showSignup() {
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        let popupHeader = document.getElementById("popupheader");
        popupHeader.innerHTML = "Create New Account";
        let signin = document.getElementById("signin");
        let signup = document.getElementById("signup");
        signin.style.display = "none";
        signup.style.display = "block";

        let fullname = document.getElementById("fullname");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let signuppassword = document.getElementById("signuppassword");
        let confirmpassword = document.getElementById("confirmpassword");
        fullname.value = "";
        email.value = "";
        role.value = "";
        signuppassword.value = "";
        confirmpassword.value = "";
    }

    closeSignIn(event) {
        if (event.target.id === "popup") {
            let popup = document.getElementById("popup");
            popup.style.display = "none";
        }
    }

    userRegistration() {
        let fullname = document.getElementById("fullname");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let signuppassword = document.getElementById("signuppassword");
        let confirmpassword = document.getElementById("confirmpassword");

        fullname.style.border = "";
        email.style.border = "";
        role.style.border = "";
        signuppassword.style.border = "";

        if (fullname.value === "") {
            fullname.style.border = "1px solid red";
            fullname.focus();
            return;
        }
        if (email.value === "") {
            email.style.border = "1px solid red";
            email.focus();
            return;
        }
        if (role.value === "") {
            role.style.border = "1px solid blue";
            role.focus();
            return;
        }
        if (signuppassword.value === "") {
            signuppassword.style.border = "1px solid red";
            signuppassword.focus();
            return;
        }
        if (signuppassword.value !== confirmpassword.value) {
            signuppassword.style.border = "1px solid blue";
            signuppassword.focus();
            return;
        }

        var data = JSON.stringify({
            fullname: fullname.value,
            email: email.value,
            role: role.value,
            password: signuppassword.value
        });

        callApi("POST", "http://localhost:8056/users/signup", data, this.getResponse);
    }

    getResponse(res) {
        let resp = res.split('::');
        alert(resp[1]);
        if (resp[0] === "200") {
            let signin = document.getElementById("signin");
            let signup = document.getElementById("signup");
            signin.style.display = "block";
            signup.style.display = "none";
        }
    }

    forgetPassword() {
        username.style.border = "";
        if (username.value === "") {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        let url = "http://localhost:8056/users/forgetpassword/" + username.value;
        callApi("GET", url, "", this.forgetpasswordResponse);
    }

    forgetpasswordResponse(res) {
        let data = res.split('::');
        if (data[0] === "200") {
            responseDiv1.innerHTML = `<br/><br/><br/><br/><label style='color:green'>${data[1]}</label>`;
        } else {
            responseDiv1.innerHTML = `<br/><br/><br/><br/><label style='color:red'>${data[1]}</label>`;
        }
    }

    render() {
        return (
            <div id='container'>
                <div id='popup' onClick={this.closeSignIn}>
                    <div id='popupwindow'>
                        <div id='popupheader'><label>LOGIN</label></div>
                        <div id='signin'>
                            <label className='uernameLabel'>UserName:</label>
                            <input type='text' id='username' />
                            <label className='passwordLabel'>Password:</label>
                            <input type='password' id='password' />
                            <div className='forgetpassword'>
                                Forget <label onClick={this.forgetPassword}>Password?</label>
                            </div>
                            <button className='signinButton'>SIGNIN</button>
                            <div className='div1' id='responseDiv1'></div>
                            <div className='div2'>
                                Don't Have An account <label onClick={this.showSignup}> SignUp Now</label>
                            </div>
                        </div>
                        <div id='signup'>
                            <label>FullName</label>
                            <input type='text' id='fullname' />
                            <label>Email</label>
                            <input type='text' id='email' />
                            <label>Select Role</label>
                            <select id='role'>
                                <option value=''></option>
                                <option value='1'>Admin</option>
                                <option value='2'>Employeer</option>
                                <option value='3'>Job seeker</option>
                            </select>
                            <label>Password</label>
                            <input type='password' id='signuppassword' />
                            <label>Confirm Password</label>
                            <input type='password' id='confirmpassword' />
                            <button onClick={this.userRegistration}>Register</button>
                            <div>
                                Already Have an Account <span onClick={this.showSignin}>SignIn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='header'>
                    <img className='logo' src='logo.png' alt='' />
                    <div className='logoText'><span>Job</span> portal</div>
                    <img className='signinIcon' src='user.png' alt='' onClick={this.showSignin} />
                    <label className='signinText' onClick={this.showSignin}>signIn</label>
                </div>
                <div id='content'>
                    <div className='text1'>India's No 1 job platform</div>
                    <div className='text2'>Your job search ends here</div>
                    <div className='text3'>Discover career opportunities</div>
                    <div className='searchBar'>
                        <input type='text' className='searchjobText' placeholder='Search job by "skill"' />
                        <input type='text' className='joblocationText' placeholder='Job Location' />
                        <button className='searchjob'>Search Job</button>
                    </div>
                </div>
                <div id='footer'>
                    <label className='copyrightText'>Copyright @2024, All rights reserved</label>
                    <img className='socialmediaIcon' src='facebook.png' alt='' />
                    <img className='socialmediaIcon' src='linkedin.png' alt='' />
                    <img className='socialmediaIcon' src='twitter.png' alt='' />
                </div>
            </div>
        );
    }
}

export default App;
