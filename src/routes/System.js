import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserHistory from '../containers/System/UserHistory';
import UserKeyboardLog from '../containers/System/UserKeyboardLog';
import UserBlockWebsite from '../containers/System/UserBlockWebsite';
import AdminManage from '../containers/System/AdminManage';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-history" component={UserHistory} />
                        <Route path="/system/user-keyboard-log" component={UserKeyboardLog} />
                        <Route path="/system/user-block-website" component={UserBlockWebsite} />
                        <Route path="/system/admin-manage" component={AdminManage}/>
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
