import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserBlockWebsite extends Component {

    render() {
        return (
            <div>
                MANAGE USER BLOCK WEBSITE
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockWebsite);
