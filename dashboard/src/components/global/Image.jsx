import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {
  constructor(props) {
	super(props);
  }

  render() {
    return (
        <img src={this.props.srcUrl} className={this.props.clsName} alt={this.props.altName} id={this.props.idName} />
    );
  }
}

Image.defaultProps = {
  srcUrl: '/src/images/100.png',
  idName: ''
};

Image.propTypes = {
  srcUrl: PropTypes.string.isRequired,
  altName : PropTypes.string,
  clsName: PropTypes.string,
  idName: PropTypes.string,
}