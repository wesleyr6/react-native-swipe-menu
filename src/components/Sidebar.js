import React from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, Dimensions, StyleSheet, Animated, Easing } from 'react-native';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			sidebarWidth: new Animated.Value(0),
			sidebarMaxWidth: (Dimensions.get('window').width*85)/100, // It will open 85% of the total screen size
			overlayWidth: 0,
			overlayOpacity: new Animated.Value(0),
			overlayMaxOpacity: 0.7, // Opacity Level when the overlay view is opened
			animationDuration: 400 // miliseconds
		};

		let configs = {
			grantX: null, // Position X of the view when the user exec click command
			movingX: null, // Position X of the view when the user starts to moving
			swipeWidthStart: 30, // Width of the view which user can starts swipe
			swipeWidthToClose: 75 // Width of the view which user needs to move to close swipe
		}

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				configs.grantX = pageX;
			},

			onPanResponderMove: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				const { isOpen, sidebarMaxWidth, sidebarWidth, overlayMaxOpacity } = this.state;

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

						const _size = pageX > sidebarMaxWidth ? sidebarMaxWidth : pageX;

						this.setState({
							sidebarWidth: new Animated.Value(_size),
							overlayWidth: '100%'
						});
					}
				}

				this.setState({
					overlayOpacity: new Animated.Value( (overlayMaxOpacity*sidebarWidth._value)/sidebarMaxWidth )
				})
			},

			onPanResponderRelease: (evt, gestureState) => {
				const { isOpen, sidebarMaxWidth } = this.state;
				const { pageX } = evt.nativeEvent;
				const result = configs.grantX - pageX;

				if(configs.movingX) {
					if(isOpen) {
						if(result > configs.swipeWidthToClose ) {
							this.animateToInitial();
						} else {
							this.animateToMax();
						}

					} else {
					
						if( (result*-1) < configs.swipeWidthToClose ) {
							this.animateToInitial();
						} else {
							this.animateToMax();
						}
					}

					configs.movingX = null
				} else {
					// When click on Overlay view
					if(configs.grantX > sidebarMaxWidth && isOpen) {
						this.animateToInitial();
					}
				}

				configs.grantX = null;
			},

			onPanResponderTerminate: (evt, gestureState) => {
				// Another component has become the responder, so this gesture
				// should be cancelled
			}
		});
	}

	animate(_value, _toValue, _duration = this.state.animationDuration, _isFade) {
		let configs = {
			toValue: _toValue,
			duration: _duration
		}

		if(!_isFade)
			configs.easing = Easing.elastic()

		return Animated.timing(_value, configs);
	}

	animateToMax() {
		const { sidebarWidth, sidebarMaxWidth, overlayOpacity, overlayMaxOpacity, animationDuration } = this.state;

		this.animate(sidebarWidth, sidebarMaxWidth).start(() => {
			this.setState({
				sidebarWidth: new Animated.Value(sidebarMaxWidth),
				isOpen: true
			});
		});
		
		this.animate(overlayOpacity, overlayMaxOpacity, animationDuration, true).start(() => {
			this.setState({
				overlayOpacity: new Animated.Value(overlayMaxOpacity)
			})
		});
	}

	animateToInitial() {
		const { sidebarWidth, overlayOpacity, animationDuration } = this.state;

		this.animate(sidebarWidth, 0).start(() => {
			this.setState({
				sidebarWidth: new Animated.Value(0),
				isOpen: false,
				overlayWidth: 0
			});
		});

		this.animate(overlayOpacity, 0, animationDuration, true).start(() => {
			this.setState({
				overlayOpacity: new Animated.Value(0)
			})
		});
	}

	render() {
		const { sidebarMaxWidth, sidebarWidth, overlayWidth, overlayOpacity } = this.state;
		const { contentComponent } = this.props;

		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Animated.View style={[styles.sidebar, { maxWidth: sidebarMaxWidth, width: sidebarWidth }]} />
				<Animated.View style={[styles.overlay, {width: overlayWidth, opacity: overlayOpacity}]} />

				{contentComponent}
			</View>
		)
	}
}

Sidebar.propTypes = {
	contentComponent: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
		backgroundColor: '#fff',
		flexDirection: 'row'
	},
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