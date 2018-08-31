import React from 'react';
import { StatusBar, View } from 'react-native';
import { Constants } from 'expo';

const MyStatusBar = ({ bg, ...props }) => {
	return (
		<View style={{ backgroundColor: bg, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={bg} {...props} />
		</View>
	);
};

export default MyStatusBar;