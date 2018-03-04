import React from 'react';
import { connect } from 'react-redux';
import HeaderComponent from '../components/includes/HeaderComponent';

class HeaderContainer extends React.Component{
    constructor(props){
        super(props);
    }

}
const mapStateToProps = state => {
    return {
        isLoggedIn: false
    }
}

export default connect(mapStateToProps)(HeaderComponent);