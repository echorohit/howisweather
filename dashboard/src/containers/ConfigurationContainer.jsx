import React from 'react';
import Input from '../components/global/Input';
import CheckBoxOrRadio from '../components/global/CheckBoxOrRadio';
import Button from '../components/global/Button';
import { fetchData } from '../actions/index';
import { connect } from 'react-redux';
import ConfigurationComponent from '../components/ConfigurationComponent'

class ConfigurationContainer extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount() {
      let fn = fetchData(
        'http://localhost:3500/api/configuration', 
        'CONFIFGURTAION', 
        'GET'
      );
      this.props.dispatch(fn)
    }

    render(){
        if(this.props.loaded) {
            return(<ConfigurationComponent configuration={this.props.configuration} />);
        } else {
            return (<div> Loading....</div>)
        }
       
    }
} 

const mapStateToProps = state => {
    return {
        configuration: state.configuration.data,
        loaded: state.configuration.loaded,
    }
};
export default connect(mapStateToProps, undefined)(ConfigurationContainer);