import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
export default class HeaderComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            settingStyle:{
                display:'none'
            }, show:false
        }

        this.toggleSettings = this.toggleSettings.bind(this);
    }

    toggleSettings(){
        console.log();
        if(!this.state.show){
            this.setState({
                show:true,
                settingStyle:{
                    display:'block'
                }
            })
        }else{
            this.setState({
                show:false,
                settingStyle:{
                    display:'none'
                }
            })
        }
    }

    render(){
        return(
            <header className="sd-header">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <Link to={this.props.homeLink} className="nav-link">Weather Dashboard</Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/weather' className="nav-link">Weather</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

HeaderComponent.defaultProps = {
    isLoggedIn: false,
    homeLink:'/'
  };

  HeaderComponent.propTypes = {
    isLoggedIn: PropTypes.bool,
    homeLink: PropTypes.string,
    isLoggedOut:PropTypes.func
  }
