import React from 'react';
import { View, PanResponder, Dimensions, Text, StyleSheet, Animated, Easing } from 'react-native';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			sidebarWidth: new Animated.Value(0),
			sidebarMaxWidth: (Dimensions.get('window').width*85)/100 // It will open 85% of the total screen size
		};

		let configs = {
			grantX: null, // Position X of the view when the user exec click command
			movingX: null, // Position X of the view when the user starts to moving
			swipeWidthStart: 10, // Width of the view which user can starts swipe
			swipeWidthToClose: 100 // Width of the view which user needs to move to close swipe
		}

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
				configs.grantX = pageX;
			},

			onPanResponderMove: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				const { isOpen, sidebarMaxWidth } = this.state;

				if(isOpen) {
					if(configs.grantX > pageX) {
						configs.movingX = pageX;
						this.setState({
							sidebarWidth: new Animated.Value(sidebarMaxWidth - (configs.grantX - pageX)),
						});
					}
				} else {
					if(configs.grantX < configs.swipeWidthStart) {
						configs.movingX = pageX;
						this.setState({
							sidebarWidth: new Animated.Value(pageX)
						});
					}
				}
			},

			onPanResponderRelease: (evt, gestureState) => {
				const { sidebarWidth, sidebarMaxWidth } = this.state;
				const { pageX } = evt.nativeEvent;
				const result = configs.grantX - pageX;

				if(configs.movingX) {
					if(result > configs.swipeWidthToClose ) {
						this.animate(sidebarWidth, 0).start(() => {
							this.setState({
								sidebarWidth: new Animated.Value(0),
								isOpen: false
							});
						});
					} else {
						this.animate(sidebarWidth, sidebarMaxWidth).start(() => {
							this.setState({
								sidebarWidth: new Animated.Value(sidebarMaxWidth),
								isOpen: true
							});
						});
					}

					configs.grantX = null;
					configs.movingX = null
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
		const { sidebarMaxWidth, sidebarWidth } = this.state;

		return (
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Animated.View style={[styles.sidebar, { maxWidth: sidebarMaxWidth, width: sidebarWidth }]} />

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
