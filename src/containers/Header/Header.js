import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import {Languages} from '../../utils/constant'
import {changeLanguageApp} from '../../store/actions'
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút thay đổi ngôn ngữ */}
                <div className="language-buttons">
                    <span className='welcome'>
                        <FormattedMessage id='common.welcome'/>
                        {userInfo && userInfo.full_name ? userInfo.full_name: ''}!
                        </span>
                    <button className="btn-language" onClick={() => this.changeLanguage(Languages.VI)}>
                        VN
                    </button>
                    <button className="btn-language" onClick={() => this.changeLanguage(Languages.EN)}>
                        EN
                    </button>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (lang) => dispatch(actions.changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
