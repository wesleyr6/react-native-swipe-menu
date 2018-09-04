import React from 'react';
import { View } from 'react-native';
import StatusBar from './src/components/StatusBar';
import Content from './src/components/Content';
import Sidebar from './src/components/Sidebar';
import Menu from './src/components/Menu';

const App = () => {
	return (
		<View>
			<StatusBar bg={'#313131'} />
			
			<Sidebar menu={<Menu />}>
				<Content />
			</Sidebar>
		</View>
	);
}

export default App;