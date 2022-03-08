import React from 'react';
import { colors } from '../../themes/colors';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientBlock = ({ children, style }) => {
    const gradient = [colors.brand.tertiary, colors.brand.primaryAlt, colors.brand.primary];
    return (
        <LinearGradient colors={gradient} style={style} start={[0, 0]} end={[1, 1]} location={[0.25, 0.4, 1]}>
            {children}
        </LinearGradient>
    );
};
