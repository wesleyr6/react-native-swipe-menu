import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';
 
const Menu = ({ closeSidebar }) => {
    return(
        <Button title="click to close it" onPress={() => closeSidebar()} />
    )
}

Menu.propTypes = {
    closeSidebar: PropTypes.func,
    sidebarIsOpen: PropTypes.bool
}

export default Menu;