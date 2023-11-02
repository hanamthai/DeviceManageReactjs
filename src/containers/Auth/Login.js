import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';
import Loader from '../../components/Loader'
import ModalRegister from './ModalRegister';
import {handleRegisterNewAccountService} from '../../services/adminService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: "",
            isLoading: false,
            isOpenModalRegister: false,
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
                            errMessage: error?.response?.data?.message
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

    toggleUserModal = () => {
        this.setState({
            isOpenModalRegister: !this.state.isOpenModalRegister
        })
    }

    createNewUser = async (data) => {
        try {
            console.log("data:", data)
            this.setState({isLoading: true})
            let resp = await handleRegisterNewAccountService(data);
            console.log("resp:", resp)
            if (resp) {
                this.setState({
                    isOpenModalRegister: false,
                    isLoading: false
                })
                alert("Đăng kí thành công, vui lòng đăng nhập để tiếp tục!!")
            }
        } catch(error) {
            this.setState({isLoading: false})
            if (error?.response?.data?.msg === 'Token has expired'){
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                this.props.LoginAgain()
            }
            else if (error?.response?.status != 200) {
                alert("Error: " + error?.response?.data?.message)
            }
        }
    }

    render() {
        return (
            <div className='login-background'>
                {this.state.isLoading && <Loader></Loader>}
                {this.state.isOpenModalRegister && 
                    <ModalRegister
                        isOpen={this.state.isOpenModalRegister}
                        toggleUserManage={this.toggleUserModal}
                        createNewUser = {this.createNewUser}
                    />
                }
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'><FormattedMessage id='login.login'/></div>
                        <div className='col-12 form-group login-input'>
                            <label className='login-label-text'><FormattedMessage id='login.username'/>:</label>
                            <input type='text' className='form-control' placeholder='Nhập tài khoản của bạn' onChange={(event) => this.handleOnChangeUsernameInput(event)}/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label className='login-label-text'><FormattedMessage id='login.password'/>:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? 'text': 'password'} className='form-control' placeholder='Nhập mật khẩu của bạn' onChange={(event) => this.handleOnChangePasswordInput(event)}/>
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword? 'far fa-eye': 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>{this.state.errMessage}</div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>
                                <FormattedMessage id='login.login'/>
                            </button>
                        </div>
                        <div className='col-12 div-support'>
                            <span className='span-support'><FormattedMessage id='login.forgot-password'/>?</span>
                            <span className='span-support' onClick={() => {this.toggleUserModal()}}><FormattedMessage id='login.register'/>!</span>
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
