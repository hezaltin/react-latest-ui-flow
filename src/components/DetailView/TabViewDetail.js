import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';



const TabViewDetail = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabViewDetail.propTypes = {
    children: PropTypes.node.isRequired,
  };
  

export default TabViewDetail;