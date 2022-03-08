import React, { useState } from 'react';
import { Switch as RNSwitch } from 'react-native';
import { colors } from '../../themes/colors';
import PropTypes from 'prop-types';

export const Toggle = ({ initialValue, onPress, value }) => {
    return (
        <RNSwitch
            trackColor={{ false: colors.grey.light, true: colors.brand.primary }}
            ios_backgroundColor={colors.grey.light}
            onValueChange={onPress}
            value={value}
        />
    );
};

Toggle.propTypes = {
    initialValue: PropTypes.bool
};

Toggle.defaultProps = {
    initialValue: false
};
