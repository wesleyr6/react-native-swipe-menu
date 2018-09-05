import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
 
const Menu = ({ closeSidebar }) => {
    return(
        <ScrollView>
            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={closeSidebar}>
                <Text style={styles.buttonText}>Close menu</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

Menu.propTypes = {
    closeSidebar: PropTypes.func,
    sidebarIsOpen: PropTypes.bool
}

const styles = StyleSheet.create({
	buttonStyle: {
        padding: 10,
        backgroundColor: '#1194F6'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center'
	}
});

export default Menu;