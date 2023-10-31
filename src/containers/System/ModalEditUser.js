import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import lodash from 'lodash'

class ModelEditUser extends Component {

    constructor(props) {
        super(props);
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
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id="user-manage.form-edit.title"/>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label><FormattedMessage id="user-manage.form-edit.full-name"/></label>
                            <input 
                                type='text' 
                                onChange={((event) => {this.handleOnChangeInput(event, "fullName")})}
                                value={this.state.fullName}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="user-manage.form-edit.password"/></label>
                            <input 
                                type='password' 
                                onChange={((event) => {this.handleOnChangeInput(event, "password")})}
                                value={this.state.password}
                                placeholder='Fill your new password or empty'
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label><FormattedMessage id="user-manage.form-edit.email"/></label>
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
                    <FormattedMessage id="user-manage.form-edit.btn-save"/>
                </Button>{' '}
                <Button color="secondary px-3" onClick={() => this.toggle()}>
                    <FormattedMessage id="user-manage.form-edit.btn-close"/>
                </Button>
                </ModalFooter>
            </Modal>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
