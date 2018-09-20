import React from 'react';
import PropTypes from 'prop-types';
import { 
	View, 
	PanResponder, 
	Dimensions, 
	StyleSheet, 
	Animated, 
	Easing 
} from 'react-native';

let configs = {
	movingX: null, // Position X of the view when the user starts to moving
	swipeWidthStart: 40, // Width of the view which user can starts swipe
	swipeWidthToClose: 70, // Width of the view which user needs to move to close swipe
	sidebarWidth: ((Dimensions.get('window').width*84)/100), // It will open 84% of the total screen size
	animationDuration: 400, // miliseconds
	overlayMaxOpacity: 0.7, // Opacity Level when the overlay view is opened
	tolerance: 10
}

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false, 
			sidebarPosition: new Animated.Value(configs.sidebarWidth*-1),
			overlayWidth: 0,
			overlayOpacity: new Animated.Value(0)
		};

		this.animateToMax = this.animateToMax.bind(this);
		this.animateToInitial = this.animateToInitial.bind(this);
		this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
		this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
		this.onPanResponderMove = this.onPanResponderMove.bind(this);
		this.onPanResponderRelease = this.onPanResponderRelease.bind(this);

		this.responder = PanResponder.create({
			onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
			onPanResponderMove: this.onPanResponderMove,
			onPanResponderRelease: this.onPanResponderRelease
		});
	}

	onStartShouldSetPanResponder(evt, gestureState) {
		const { isOpen } = this.state;

		if(isOpen)
			return true;

		return false;
	}

	onMoveShouldSetPanResponder(evt, gestureState) {
		if(this.state.isOpen) {
			if(gestureState.dx > configs.tolerance || gestureState.dx < configs.tolerance*-1)
				return true
		} else {
			if(gestureState.moveX > configs.swipeWidthStart)
				return false;

			return true
		}
	}

	onPanResponderMove(evt, gestureState) {
		const { pageX } = evt.nativeEvent;
		const { isOpen } = this.state;

		if(isOpen) {
			if(gestureState.x0 > pageX) {
				configs.movingX = pageX;
				
				const calc = (configs.overlayMaxOpacity*(gestureState.x0 - pageX))/configs.sidebarWidth

				this.setState({
					sidebarPosition: new Animated.Value(pageX - gestureState.x0),
					overlayOpacity: new Animated.Value(configs.overlayMaxOpacity - calc)
				});
			}
		} else {
			if(gestureState.x0 < configs.swipeWidthStart) {
				configs.movingX = pageX;

				const _size = pageX > configs.sidebarWidth ? configs.sidebarWidth : pageX;
				const calc = (configs.overlayMaxOpacity*_size)/configs.sidebarWidth

				this.setState({
					overlayWidth: '100%',
					sidebarPosition: new Animated.Value(_size + configs.sidebarWidth*-1),
					overlayOpacity: new Animated.Value(calc)
				});
			}
		}
	}

	onPanResponderRelease(evt, gestureState) {
		const { isOpen } = this.state;
		const { pageX } = evt.nativeEvent;
		const result = pageX - gestureState.x0;

		if(configs.movingX) {
			const conditional = isOpen ? (result*-1) > configs.swipeWidthToClose : result < configs.swipeWidthToClose;

			if(conditional ) {
				this.animateToInitial();
			} else {
				this.animateToMax();
			}

			configs.movingX = null
		} else {
			// When click on Overlay view
			if(gestureState.x0 > configs.sidebarWidth && isOpen) {
				this.animateToInitial();
			}
		}
	}

	animate(_value, _toValue, _duration = configs.animationDuration, _isFade) {
		let configs = {
			toValue: _toValue,
			duration: _duration
		}

		if(!_isFade)
			configs.easing = Easing.elastic()

		return Animated.timing(_value, configs);
	}

	animateToMax() {
		const { sidebarPosition, overlayOpacity, overlayWidth } = this.state;

		if(overlayWidth !== '100%')
			this.setState({ overlayWidth: '100%' })

		this.animate(sidebarPosition, 0).start(() => {
			this.setState({
				sidebarPosition: new Animated.Value(0),
				isOpen: true
			});
		});
		
		this.animate(overlayOpacity, configs.overlayMaxOpacity, configs.animationDuration, true).start(() => {
			this.setState({
				overlayOpacity: new Animated.Value(configs.overlayMaxOpacity)
			})
		});
	}

	animateToInitial() {
		const { overlayOpacity, sidebarPosition } = this.state;

		this.animate(sidebarPosition, configs.sidebarWidth*-1).start(() => {
			this.setState({
				isOpen: false,
				overlayWidth: 0,
				sidebarPosition: new Animated.Value(configs.sidebarWidth*-1)
			});
		});

		this.animate(overlayOpacity, 0, configs.animationDuration, true).start(() => {
			this.setState({
				overlayOpacity: new Animated.Value(0)
			})
		});
	}

	childrenWithProps(item, ...rest) {
		return React.Children.map(item, child => 
			React.cloneElement(child, ...rest))
	}

	render() {
		const { overlayWidth, overlayOpacity, sidebarPosition, isOpen } = this.state;
		const { children, menu } = this.props;

		return(
			<View style={styles.container} {...this.responder.panHandlers}>
				<Animated.View style={[styles.sidebar, { left: sidebarPosition }]}>
					{this.childrenWithProps(menu, { sidebarIsOpened: isOpen, closeSidebar: this.animateToInitial })}
				</Animated.View>

				<Animated.View style={[styles.overlay, {width: overlayWidth, opacity: overlayOpacity}]} />

				{this.childrenWithProps(children, { sidebarIsOpened: isOpen, openSidebar: this.animateToMax })}
			</View>
		)
	}
}

Sidebar.propType = {
	children: PropTypes.object.isRequired, 
	menu: PropTypes.object.isRequired
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
		top: 0,
		zIndex: 999,
		backgroundColor: '#1e1d29',
		width: configs.sidebarWidth
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