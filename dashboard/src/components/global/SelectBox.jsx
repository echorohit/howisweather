import React from 'react';
import PropTypes from 'prop-types';

export default class SelectBox extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
        [
          this.props.addLabel && <label><b>{this.props.label}</b></label>,
           <select  
          name={this.props.name}
          onChange= {this.handleChange} >
            <option value={this.props.placeHolder}>{this.props.placeHolder}</option>
            {this.props.option.map(opt=>
              <option value={opt}>{opt}</option>
            )}
          </select>
        ]
    );
  }
}

SelectBox.defaultProps = {
  clsName: 'input',
  addLabel: true,
  placeHolder: 'Select',
  idName: ''
};

SelectBox.propTypes = {
  name : PropTypes.string.isRequired,
  clsName: PropTypes.string,
  idName: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  option: PropTypes.array.isRequired,
  selectedOption: PropTypes.array,
}
