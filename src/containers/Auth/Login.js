import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';
import Loader from '../../components/Loader'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
            isLoading: false,
        }
    }

    handleOnChangeUsernameInput = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async() => {
        this.setState({
            errMessage: ""
        })
        if (this.state.username == ""){
            this.setState({
                errMessage: "Please input username!!"
            })
        }else if (this.state.password == ""){
            this.setState({
                errMessage: "Please input password!!"
            })
        } else{
            try {
                this.setState({isLoading: true})
                let data = await handleLogin(this.state.username, this.state.password);
                if (data != "") {
                    this.setState({isLoading: false})
                    this.props.userLoginSuccess(data)
                }
            } catch(error){
                this.setState({isLoading: false})
                if (error.response) {
                    if (error.response.data) {
                        this.setState({
                            errMessage: error.response.data.message
                        })
                    }
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                {this.state.isLoading && <Loader></Loader>}
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label className='login-label-text'>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' onChange={(event) => this.handleOnChangeUsernameInput(event)}/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label className='login-label-text'>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? 'text': 'password'} className='form-control' placeholder='Enter your password' onChange={(event) => this.handleOnChangePasswordInput(event)}/>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword? 'far fa-eye': 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>{this.state.errMessage}</div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>
                                Login
                            </button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password?</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
