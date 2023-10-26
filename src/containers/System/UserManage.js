import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import {handleUserInfo} from '../../services/userService'
import {processLogout} from '../../store/actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader'

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
        }
    }


    async componentDidMount() {
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
                        this.props.LoginAgain()
                    }
                    else {
                        this.setState({isToast: true, toastMsg: error.response.data.message})
                    }
                }
            }
        }
    }


    render() {
        let arrayUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                {this.state.isLoading && <Loader></Loader>}
                <div className='title text-center'>
                    Manage users in system
                </div>
                <div>
                    {/* {this.state.isToast && notify} */}
                </div>
                <div className='users-table mt-4 mx-1'>
                <table id="customers">
                <tr>
                    <th>Email</th>
                    <th>FullName</th>
                    <th>Device</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {arrayUsers && arrayUsers.map((item, index) => {
                    let _devices =  item.devices.map(device => device.deviceName)
                    let deviceNamesString = _devices.join(" | ")
                    return (
                        <tr>
                            <td>{item.email}</td>
                            <td>{item.fullName}</td>
                            <td>{deviceNamesString}</td>
                            <td>{item.status}</td>
                            <td>
                                <button className='btn-edit'>
                                    <i class="far fa-edit"></i>
                                </button>
                                <button className='btn-block'>
                                    <i class="fas fa-ban"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        LoginAgain: () => dispatch(processLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
