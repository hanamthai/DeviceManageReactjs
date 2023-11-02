import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserHistory.scss'
import Loader from '../../components/Loader'
import {processLogout} from '../../store/actions/userActions'
import {
    handleUserInfo,
    handleGetWebHistory,
    handleTopWebHistory
} from '../../services/userService'


class UserHistory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrHistories: [],
            isLoading: false,
            userAndDevices: [],
            deviceToMapping: [],
            selectChild: "",
            selectDevice: "",
            selectDay: "",
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
                    userAndDevices: resp.data
                })
            }
        }
        catch (error){
            this.setState({isLoading: false})
            if (error.response) {
                if (error.response.data) {
                    if (error?.response?.data?.msg === 'Token has expired'){
                        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                        this.props.LoginAgain()
                    } else if (error?.response?.status === 401){
                        alert(error?.response?.data?.message)
                    }
                }
            }
        }
    }

    getHistoryByDay = async () => {
        try {
            let childID = this.state.selectChild
            let deviceID = this.state.selectDevice
            let day = this.state.selectDay
            // validate input
            if (childID == "" || deviceID == "" || day == "") {
                alert("Please select input to filter!!")
            }
            else{
                this.setState({isLoading: true})
                const resp = await handleGetWebHistory(Number(childID),Number(deviceID),Number(day));
                if (resp.data) {
                    this.setState({isLoading: false})
                    this.setState({
                        arrHistories: resp.data
                    })
                }
            }
        } catch(error){
            this.setState({isLoading: false})
            if (error.response) {
                if (error.response.data) {
                    if (error?.response?.data?.msg === 'Token has expired'){
                        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                        this.props.LoginAgain()
                    } else if (error?.response?.status != 200){
                        alert(error?.response?.data?.message)
                    }
                }
            }
        }
    }

    getTopHistoryWeb = async () => {
        try {
            let childID = this.state.selectChild
            // validate input
            if (childID == "") {
                alert("Please select child to filter!!")
            }
            else{
                this.setState({isLoading: true, selectDevice: "", selectDay: ""})
                const resp = await handleTopWebHistory(Number(childID));
                if (resp.data) {
                    this.setState({isLoading: false})
                    this.setState({
                        arrHistories: resp.data
                    })
                }
            }
        } catch(error){
            this.setState({isLoading: false})
            if (error.response) {
                if (error.response.data) {
                    if (error?.response?.data?.msg === 'Token has expired'){
                        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!!")
                        this.props.LoginAgain()
                    } else if (error?.response?.status != 200){
                        alert(error?.response?.data?.message)
                    }
                }
            }
        }
    }

    handleChoseChild = (value) => {
        var data = this.state.userAndDevices;
        for (var i=0; i<data.length; i++) {
            if (data[i].id == value) {
                this.setState({ 
                    selectChild: value,
                    deviceToMapping: data[i].devices
                });
                break;
            } 
        }
    }

    handleChoseDevice = (value) => {
        this.setState({ 
            selectDevice: value
        });
    }

    handleChoseDay = (value) => {
        this.setState({ 
            selectDay: value
        });
    }

    render() {
        let arrayHistories = this.state.arrHistories;
        let arrUserAndDevices = this.state.userAndDevices;
        let arrDeviceToMapping = this.state.deviceToMapping;
        return (
            <div className="user-history-container">
                {this.state.isLoading && <Loader></Loader>}
                <div className='title'>
                    <FormattedMessage id="history-web.title"/>
                </div>

                <div className='filter-history'>
                    <div className='filter-name'><FormattedMessage id="history-web.filter.child"/>:</div>
                    <div className='select-dropdown'>
                        <select id="selectChild" name="child" value={this.state.selectChild} onChange={(val) => this.handleChoseChild(val.target.value)}>
                            <option value="" hidden>Chọn con cái</option>
                            {arrUserAndDevices && arrUserAndDevices.map((item, index) => {
                                return (
                                    <option value={item.id}>{item.fullName}</option>
                                )
                            })}
                        </select>   
                    </div>
                    <div className='filter-name'><FormattedMessage id="history-web.filter.device"/>:</div>
                    <div className='select-dropdown'>
                        <select id="selectDevice" name="device" value={this.state.selectDevice} onChange={(val) => this.handleChoseDevice(val.target.value)}>
                            <option value="" hidden>Chọn thiết bị</option>
                            {arrDeviceToMapping && arrDeviceToMapping.map((item, index) => {
                                return (
                                    <option value={item.id}>{item.deviceName}</option>
                                )
                            })}
                        </select>   
                    </div>
                    <div className='filter-name'><FormattedMessage id="history-web.filter.access-day"/>:</div>
                    <div className='select-dropdown'>
                        <select id="selectDay" name="day" onChange={(val) => this.handleChoseDay(val.target.value)}>
                            <option value="" hidden>Chọn ngày truy cập</option>
                            <option value="3">3 ngày</option>
                            <option value="7">7 ngày</option>
                            <option value="14">14 ngày</option>
                            <option value="21">21 ngày</option>
                            <option value="30">30 ngày</option>
                        </select>   
                    </div>
                    <div className='div-search'>
                        <button className='btn-search' onClick={() => this.getHistoryByDay()}>
                            <i class="fas fa-search px-2"></i>
                            <FormattedMessage id="history-web.filter.btn-search"/>
                        </button>
                    </div>
                    <div className='div-chart'>
                        <button className='btn-chart' onClick={() => this.getTopHistoryWeb()}>
                            <i class="fas fa-chart-line px-2"></i>
                        </button>
                    </div>
                </div>

                <div className='user-history-body'>
                    <div className='users-table mt-4 mx-1'>
                    <table id="users">
                    <tbody>
                    <tr>
                        <th><FormattedMessage id="history-web.url"/></th>
                        <th><FormattedMessage id="history-web.total-visit"/></th>
                        <th><FormattedMessage id="history-web.created-at"/></th>
                    </tr>
                    {arrayHistories && arrayHistories.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.url}</td>
                                <td>{item.total_visit}</td>
                                <td>{item.created_at}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserHistory);
