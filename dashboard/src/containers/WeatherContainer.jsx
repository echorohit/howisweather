import React from 'react';
import Input from '../components/global/Input';
import CheckBoxOrRadio from '../components/global/CheckBoxOrRadio';
import Button from '../components/global/Button';
import { fetchData } from '../actions/index';
import { connect } from 'react-redux';
import WeatherComponent from '../components/WeatherComponent'
import { UV_UDP_REUSEADDR } from 'constants';

class ConfigurationContainer extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
      let fn = fetchData(
        'http://localhost:3500/api/weather', 
        'WEATHER', 
        'GET'
      );
      this.props.dispatch(fn)
    }

    render() {
        return(<WeatherComponent configuration={this.props.configuration} weather={this.props.weather} />);
    }
} 

const mapStateToProps = state => {
    return {
        weather: state.weather.data,
        configuration: state.configuration.data
    }
};
export default connect(mapStateToProps, undefined)(ConfigurationContainer);