import React from 'react';
import Content from './src/components/Content';
import Sidebar from './src/components/Sidebar';

const App = () => {
	return (
		<Sidebar contentComponent={<Content />} />
	);
}

export default App;