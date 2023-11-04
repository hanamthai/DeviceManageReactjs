import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            email: ''
        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModalForgotPassword()
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
        let arrInput = ['email']
        for(let i=0; i < arrInput.length; i++){
            if (!this.state[arrInput[i]]) {
                alert("Please fill " + arrInput[i] + '!!');
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    handleForgotPassword = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.forgotPassword(this.state); 
        }
    }

    render() {
        console.log("here")
        return (
                <Modal 
                    isOpen={this.props.isOpen} 
                    toggle={() => this.toggle()} 
                    className={'modal-user-container'}
                    size='lg'
                >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id="login.form-forgot-password-title"/>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container max-width-input'>
                            <label><FormattedMessage id="login.form-forgot-password-email"/>:</label>
                            <input 
                                type='text' 
                                onChange={((event) => {this.handleOnChangeInput(event, "email")})}
                                value={this.state.email}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button 
                    color="primary px-3" 
                    onClick={() => this.handleForgotPassword()}
                >
                    <FormattedMessage id="login.form-forgot-password-btn-submit"/>
                </Button>{' '}
                <Button color="secondary px-3" onClick={() => this.toggle()}>
                <FormattedMessage id="user-manage.form-create.btn-close"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalForgotPassword);
