import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Sidebar = ({ sidebarMaxWidth, sidebarWidth, overlayWidth, overlayOpacity, contentComponent }) => {
    return(
        <View style={{width: '100%', height: '100%'}}>
            <Animated.View style={[styles.sidebar, { maxWidth: sidebarMaxWidth, width: sidebarWidth }]} />
            <Animated.View style={[styles.overlay, {width: overlayWidth, opacity: overlayOpacity}]} />

            {contentComponent}
        </View>
    )
}

const styles = StyleSheet.create({
	sidebar: {
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 999,
		backgroundColor: '#1e1d29'
	},
	overlay: {
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 998,
		backgroundColor: '#000'
	}
});

export default Sidebar;