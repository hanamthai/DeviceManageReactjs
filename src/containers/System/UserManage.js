import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {handleUserInfo, 
        handleCreateNewUserService,
        handleBlockUserService,
        handleEditUserService    
        } from '../../services/userService'
import {processLogout} from '../../store/actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    /** Life Cycle
     *  Run component
     *  1 Run Construct -> init state
     *  2 Did mount (set state)
     *  3 Render
     */

    constructor(props) {
        super(props)
        this.state = {
            toastMsg: '',
            isToast: false,
            arrUsers: [],
            isLoading: false,
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        await this.getAllUser();
    }

    getAllUser = async () => {
        try {
            this.setState({isLoading: true})
            const resp = await handleUserInfo();
            if (resp.data) {
                this.setState({isLoading: false})
                this.setState({
                    arrUsers: resp.data
                })
            }
        }
        catch (error){
            this.setState({isLoading: false})
            if (error.response) {
                if (error.response.data) {
                    if (error.response.data.msg === 'Token has expired'){
                        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                        this.props.LoginAgain()
                    } else if (error.response.status === 401){
                        alert(error.response.data.message)
                    }
                    else {
                        this.setState({isToast: true, toastMsg: error.response.data.message})
                    }
                }
            }
        }
    }

    handleAddNewUser = () => {
        this.setState({isOpenModal: true})
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    createNewUser = async (data) => {
        try {
            this.setState({isLoading: true})
            let resp = await handleCreateNewUserService(data);
            if (resp) {
                await this.getAllUser();
                this.setState({
                    isOpenModal: false,
                    isLoading: false
                })
            }
        } catch(error) {
            this.setState({isLoading: false})
            if (error.response.data.msg === 'Token has expired'){
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                this.props.LoginAgain()
            }
            else if (error.response.status != 200) {
                alert("Error: " + error.response.data.message)
            }
        }
    }

    handleBlockUser = async (data) => {
        try {
            this.setState({isLoading: true})
            let childID = data.id
            let resp = await handleBlockUserService(childID);
            if (resp) {
                await this.getAllUser();
                this.setState({isLoading: false})
            }
        } catch(error) {
            this.setState({isLoading: false})
            if (error.response.data.msg === 'Token has expired'){
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                this.props.LoginAgain()
            }
            else if (error.response.status != 200) {
                alert("Error: " + error.response.data.message)
            }
        }
    }

    handleEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: data
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    editUser = async (data) => {
        try {
            this.setState({isLoading: true})
            let resp = await handleEditUserService(data);
            if (resp) {
                await this.getAllUser();
                this.setState({
                    isLoading: false,
                    isOpenModalEditUser: false,
                })
            }
        } catch(error) {
            this.setState({isLoading: false})
            if (error.response.data.msg === 'Token has expired'){
                alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                this.props.LoginAgain()
            }
            if (error.response.status != 200) {
                alert("Error: " + error.response.data.message)
            }
        }
    }

    render() {
        let arrayUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                {this.state.isLoading && <Loader></Loader>}
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleUserManage={this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleEditUserManage={this.toggleEditUserModal}
                        editUserInfo = {this.editUser}
                        userEditData = {this.state.userEdit}
                    />
                }
                <div className='title text-center'>
                    <FormattedMessage id="user-manage.title"/>
                </div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-user-plus px-2"></i><FormattedMessage id="user-manage.btn-add-user"/>
                    </button>
                </div>
                <div className='users-table mt-4 mx-1'>
                <table id="customers">
                <tbody>
                <tr>
                    <th><FormattedMessage id="user-manage.email"/></th>
                    <th><FormattedMessage id="user-manage.full-name"/></th>
                    <th><FormattedMessage id="user-manage.device"/></th>
                    <th><FormattedMessage id="user-manage.status"/></th>
                    <th><FormattedMessage id="user-manage.action"/></th>
                </tr>
                {arrayUsers && arrayUsers.map((item, index) => {
                    let _devices =  item.devices.map(device => device.deviceName)
                    let deviceNamesString = _devices.join(" | ")
                    return (
                        <tr>
                            <td>{item.email}</td>
                            <td>{item.fullName}</td>
                            <td>{deviceNamesString}</td>
                            <td><i className={item.status === 'inactive'? 'fas fa-lock' : 'fas fa-unlock-alt'}></i></td>
                            <td>
                                <button className='btn-edit'
                                    onClick={() => this.handleEditUser(item)}>
                                    <i className="far fa-edit"></i>
                                </button>
                                <button className='btn-block'
                                    onClick={() => this.handleBlockUser(item)}>
                                    <i className="fas fa-ban"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LoginAgain: () => dispatch(processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
