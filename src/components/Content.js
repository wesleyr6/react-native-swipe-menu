import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const Content = () => {
    return(
        <View style={styles.content}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed hendrerit ex. Fusce hendrerit ac risus semper imperdiet. Nulla vitae semper purus, a vehicula neque. Suspendisse dictum dui non tortor tristique, nec rutrum justo aliquam. Cras porttitor metus odio, at volutpat felis iaculis vel. Praesent sit amet tellus faucibus, feugiat nibh a, varius lectus. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam tellus dolor, aliquet vitae mollis sit amet, varius rutrum nulla. In lacinia elementum euismod. Donec at varius risus. Vivamus sed euismod odio, ut varius arcu. Duis vulputate mattis odio, ac convallis dui gravida tempor. Sed ornare feugiat risus, vitae scelerisque turpis accumsan a. Suspendisse a ornare felis, sed dapibus metus. Nam in mattis velit, ut posuere elit.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
	content: {
		padding: 20
	}
});

export default Content;