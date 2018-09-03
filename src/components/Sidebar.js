import React from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, Dimensions, StyleSheet, Animated, Easing, Button } from 'react-native';

const sidebarPositionCalc = (((Dimensions.get('window').width*85)/100)*-1);

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			sidebarWidth: sidebarPositionCalc*-1, // It will open 85% of the total screen size
			sidebarPosition: sidebarPositionCalc,
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
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,

			onPanResponderGrant: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				configs.grantX = pageX;
			},

			onPanResponderMove: (evt, gestureState) => {
				const { pageX } = evt.nativeEvent;
				const { isOpen, sidebarWidth, overlayMaxOpacity } = this.state;

				if(isOpen) {
					if(configs.grantX > pageX) {
						configs.movingX = pageX;
						
						const calc = (overlayMaxOpacity*(configs.grantX - pageX))/sidebarWidth

						this.setState({
							sidebarPosition: new Animated.Value(pageX - configs.grantX),
							overlayOpacity: new Animated.Value(overlayMaxOpacity - calc)
						});
					}
				} else {
					if(configs.grantX < configs.swipeWidthStart) {
						configs.movingX = pageX;

						const _size = pageX > sidebarWidth ? sidebarWidth : pageX;
						const calc = (overlayMaxOpacity*_size)/sidebarWidth

						this.setState({
							overlayWidth: '100%',
							sidebarPosition: new Animated.Value(_size + sidebarPositionCalc),
							overlayOpacity: new Animated.Value(calc)
						});
					}
				}
			},

			onPanResponderRelease: (evt, gestureState) => {
				const { isOpen, sidebarWidth } = this.state;
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
					if(configs.grantX > sidebarWidth && isOpen) {
						this.animateToInitial();
					}
				}

				configs.grantX = null;
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
		const { sidebarPosition, overlayOpacity, overlayMaxOpacity, animationDuration } = this.state;

		this.animate(sidebarPosition, 0).start(() => {
			this.setState({
				sidebarPosition: new Animated.Value(0),
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
		const { overlayOpacity, sidebarPosition, animationDuration } = this.state;

		this.animate(sidebarPosition, sidebarPositionCalc).start(() => {
			this.setState({
				isOpen: false,
				overlayWidth: 0,
				sidebarPosition: new Animated.Value(sidebarPositionCalc)
			});
		});

		this.animate(overlayOpacity, 0, animationDuration, true).start(() => {
			this.setState({
				overlayOpacity: new Animated.Value(0)
			})
		});
	}

	render() {
		const { sidebarWidth, overlayWidth, overlayOpacity, sidebarPosition, isOpen } = this.state;
		const { children } = this.props;

		const childrenWithProps = React.Children.map(children, child => 
			React.cloneElement(child, { sidebarIsOpen: isOpen }))

		return(
			<View style={styles.container} {...this._panResponder.panHandlers}>
				<Animated.View style={[styles.sidebar, { width: sidebarWidth, left: sidebarPosition }]}>
					<Button title="click to close it" onPress={() => this.animateToInitial()} />
				</Animated.View>

				<Animated.View style={[styles.overlay, {width: overlayWidth, opacity: overlayOpacity}]} />

				<View>{childrenWithProps}</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		position: 'relative',
		backgroundColor: '#fff',
		flexDirection: 'row'
	},
	buttonStyle: {
		width: '100%'
	},
	sidebar: {
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		zIndex: 999,
		backgroundColor: '#1e1d29',
		flexWrap: 'wrap'
	},
	overlay: {
		height: '100%',
		position: 'absolute',
		left: 0,
		top: 0,
		opacity: 0,
		zIndex: 998,
		backgroundColor: '#000'
	}
});

export default Sidebar;