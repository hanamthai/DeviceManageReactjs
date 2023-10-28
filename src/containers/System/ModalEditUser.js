import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import lodash from 'lodash'

class ModelEditUser extends Component {

    constructor(pros) {
        super(pros);
        this.state = {
            isOpen: false,
            id: '',
            fullName: '',
            password: '',
            email: ''
        }
    }

    componentDidMount() {
        let userInfo = this.props.userEditData
        if (userInfo && !lodash.isEmpty(userInfo)) {
            this.setState({
                id: userInfo.id,
                fullName: userInfo.fullName,
                password: '',
                email: userInfo.email
            })
        }
    }

    toggle = () => {
        this.props.toggleEditUserManage()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['fullName', 'email']
        for(let i=0; i < arrInput.length; i++){
            if (!this.state[arrInput[i]]) {
                alert("Please fill " + arrInput[i] + '!!');
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleEditUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUserInfo(this.state);
            this.setState({
                fullName: '',
                password: '',
                email: ''
            })
        }
    }

    render() {
        return (
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={() => this.toggle()} 
                    className={'modal-user-container'}
                    size='lg'

                >
                <ModalHeader toggle={() => this.toggle()}>Edit User Information</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>FullName</label>
                            <input 
                                type='text' 
                                onChange={((event) => {this.handleOnChangeInput(event, "fullName")})}
                                value={this.state.fullName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input 
                                type='password' 
                                onChange={((event) => {this.handleOnChangeInput(event, "password")})}
                                value={this.state.password}
                                placeholder='Fill your new password or empty'
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Email</label>
                            <input 
                                type='text' 
                                onChange={((event) => {this.handleOnChangeInput(event, "email")})}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                    color="primary px-3" 
                    onClick={() => this.handleEditUser()}
                >
                    Save
                </Button>{' '}
                <Button color="secondary px-3" onClick={() => this.toggle()}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
