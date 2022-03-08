/* eslint-disable no-bitwise */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../themes/colors';
import { Animated, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../utils';

const DEFAULT_POSITION = verticalScale(37);
const FOCUSED_POSITION = verticalScale(15);
const DEFAULT_ANIMATION_DURATION = 225;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: scale(10),
        paddingHorizontal: scale(3),
        backgroundColor: colors.white
    }
});

class Label extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            input: new Animated.Value(this.inputState()),
            focus: new Animated.Value(this.focusState())
        };
    }

    // TODO: convert this into a function component
    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(props) {
        const { focus, input } = this.state;
        const { isActive, isFocused, isError } = this.props;
        const duration = DEFAULT_ANIMATION_DURATION;

        if (isFocused ^ props.isFocused || isActive ^ props.isActive) {
            // eslint-disable-line
            const toValue = this.inputState(props);

            Animated.timing(input, { toValue, duration, useNativeDriver: false }).start();
        }

        if (isFocused ^ props.isFocused || isError ^ props.isError) {
            // eslint-disable-line
            const toValue = this.focusState(props);

            Animated.timing(focus, { toValue, duration, useNativeDriver: false }).start();
        }
    }

    inputState({ isFocused, isActive } = this.props) {
        return isActive || isFocused ? 1 : 0;
    }

    focusState({ isFocused, isError } = this.props) {
        // eslint-disable-next-line no-nested-ternary
        return isError ? -1 : isFocused ? 1 : 0;
    }

    render() {
        const {
            children,
            fontSize,
            activeFontSize,
            isError,
            isFocused,
            isActive,
            errorColor,
            focusedColor,
            baseColor,
            onPress,
            labelColor,
            ...props
        } = this.props;
        const { input, focus } = this.state;
        const color = focus.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [errorColor, baseColor, focusedColor]
        });

        const top = input.interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_POSITION, FOCUSED_POSITION]
        });

        const size = input.interpolate({
            inputRange: [0, 1],
            outputRange: [fontSize, activeFontSize]
        });

        const textStyle = {
            fontSize: size,
            color: colors.grey.dark,
            backgroundColor: 'transparent'
        };

        const containerStyle = {
            top
        };

        return (
            <Animated.View style={[styles.container, { height: fontSize * 1.1 }, { backgroundColor: colors[labelColor] }, containerStyle]}>
                <Animated.Text style={[textStyle]} {...props} onPress={onPress}>
                    {children}
                </Animated.Text>
            </Animated.View>
        );
    }
}

Label.propTypes = {
    children: PropTypes.any.isRequired,
    isActive: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool.isRequired,

    fontSize: PropTypes.number,
    activeFontSize: PropTypes.number,
    focusedColor: PropTypes.string,
    baseColor: PropTypes.string,
    errorColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    labelColor: PropTypes.string
};

Label.defaultProps = {
    fontSize: scale(13),
    activeFontSize: scale(11),
    focusedColor: colors.ui.primary,
    baseColor: colors.grey.medium,
    errorColor: colors.ui.tertiary,
    labelColor: 'white'
};

export default Label;
