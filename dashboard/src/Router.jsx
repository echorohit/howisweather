import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ConfigurationContainer from './containers/ConfigurationContainer';
import WeatherContainer from './containers/WeatherContainer';

export default class WebRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ConfigurationContainer}/>
                <Route exact path='/weather' component={WeatherContainer}/>
            </Switch>
        );
    }
}