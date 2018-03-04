import React from 'react';
import './styles/scss/main.scss';
import HeaderContainer from './containers/HeaderContainer';
import WebRouter from './Router';

export default class App extends React.Component {
    
    render() {
        return (
            <div>
                <HeaderContainer/>
                <WebRouter/>
            </div>
        );
    }
}
