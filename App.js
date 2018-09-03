import React from 'react';
import { View } from 'react-native';
import StatusBar from './src/components/StatusBar';
import Content from './src/components/Content';
import Sidebar from './src/components/Sidebar';

const App = () => {
	return (
		<View>
			<StatusBar bg={'#313131'} />
			
			<Sidebar>
				<Content />
			</Sidebar>
		</View>
	);
}

export default App;