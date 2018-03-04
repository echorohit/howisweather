import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor(props) {
    
	super(props);
    this.state = {
      value: this.props.value || '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let value = e.target.value.trim()
    this.setState({value: value})
  }

  render() {
    return (
        [
          this.props.addLabel && <label><b>{this.props.label}</b></label>,
          <input 
          type={this.props.inputType}
          className={this.props.clsName}
          name={this.props.name}
          value={this.state.value}
          required={this.props.RequiredField}
          placeholder={this.props.placeHolder}
          onBlur= {this.props.onBlurCB}
          onChange={this.handleChange}
          id={this.props.idName}
          autoComplete={this.props.autoComplete}
        />
        ]
    );
  }
}

Input.defaultProps = {
  addLabel: true,
  inputType: 'text',
  clsName: 'input',
  value:'',
  RequiredField:false,
  placeHolder:'',
};

Input.propTypes = {
  addLabel: PropTypes.bool,
  label: PropTypes.string,
  inputType: PropTypes.string,
  clsName: PropTypes.string,
  name : PropTypes.string.isRequired,
  value: PropTypes.string,
  RequiredField: PropTypes.bool,
  placeHolder: PropTypes.string,
  onBlurCB: PropTypes.func,
  idName: PropTypes.string,
  autoComplete:PropTypes.bool
}