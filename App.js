import React from 'react';
import { View, PanResponder, Dimensions, Text, StyleSheet, Animated, Easing } from 'react-native';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			grantX: null,
			movingX: null,
			sidebarW: new Animated.Value(0),
			sidebarMaxW: (Dimensions.get('window').width*85)/100
		};

		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onShouldBlockNativeResponder: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				const { open } = this.state;

				console.log('click', pageX, 'Open State:', open);

				this.setState({
					grantX: pageX
				});
			},

			onPanResponderMove: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				const { grantX, open, sidebarMaxW } = this.state;

				console.log('moving', open, grantX, pageX);

				if(open) {
					console.log('ABERTO')
					if(grantX > pageX) {
						console.log('moving...', 'GrantX:', grantX, 'Sidebar W:', sidebarMaxW, 'PageX:', pageX);
						this.setState({
							sidebarW: new Animated.Value(sidebarMaxW - (grantX - pageX)),
							movingX: pageX
						});
					}
				} else {
					console.log('FECHADO')
					if(grantX < 10) {
						this.setState({
							sidebarW: new Animated.Value(pageX),
							movingX: pageX
						});
					}
				}
			},

			onPanResponderRelease: (evt, gestureState) => {
				const { sidebarW, sidebarMaxW, movingX, grantX } = this.state;
				const { pageX } = evt.nativeEvent;
				const result = grantX - pageX;

				console.log('leaving', grantX, 'movingOut:', movingX);

				if(movingX) {
					if(pageX < sidebarMaxW/2 || result > 100 ) {
						console.log('LEAVING 1');
						this.animate(sidebarW, 0).start(() => {
							this.setState({
								sidebarW: new Animated.Value(0),
								open: false,
								grantX: null,
								movingX: null
							});
						});
					} else {
						console.log('LEAVING 2');
						this.animate(sidebarW, sidebarMaxW).start(() => {
							this.setState({
								sidebarW: new Animated.Value(sidebarMaxW),
								open: true,
								grantX: null,
								movingX: null
							});
						});
					}
				}
			},

			onPanResponderTerminate: (evt, gestureState) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
			}
		});
	}

	animate(_value, _toValue) {
		return Animated.timing(_value, {
			toValue: _toValue,
			easing: Easing.elastic(),
			duration: 400
		});
	}

	render() {
		const { sidebarMaxW, sidebarW } = this.state;

		return (
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Animated.View style={[styles.sidebar, { maxWidth: sidebarMaxW, width: sidebarW }]} />

				<View style={styles.content}>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed hendrerit ex. Fusce hendrerit ac risus semper imperdiet. Nulla vitae semper purus, a vehicula neque. Suspendisse dictum dui non tortor tristique, nec rutrum justo aliquam. Cras porttitor metus odio, at volutpat felis iaculis vel. Praesent sit amet tellus faucibus, feugiat nibh a, varius lectus. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam tellus dolor, aliquet vitae mollis sit amet, varius rutrum nulla. In lacinia elementum euismod. Donec at varius risus. Vivamus sed euismod odio, ut varius arcu. Duis vulputate mattis odio, ac convallis dui gravida tempor. Sed ornare feugiat risus, vitae scelerisque turpis accumsan a. Suspendisse a ornare felis, sed dapibus metus. Nam in mattis velit, ut posuere elit.
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
		backgroundColor: '#f1f1f1',
		marginTop: 23,
		flexDirection: 'row'
	},
	sidebar: {
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 5,
		backgroundColor: '#1e1d29'
	},
	content: {
		padding: 20
	}
});

export default App;
