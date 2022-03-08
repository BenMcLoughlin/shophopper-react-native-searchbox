import React from 'react';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../themes/colors';
import { scale, startCase } from '../../utils';
import styled from 'styled-components/native';

export const Button = ({ label, variant, onPress, size = 10 }) => {
    console.log('/Button.js - size: ', size);
    return (
        <Wrapper size={size} onPress={onPress}>
            {variant !== 'solid' && <Gradient />}
            <Label size={size}>{label}</Label>
        </Wrapper>
    );
};
//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.TouchableOpacity`
    flex-direction: row;
    background: ${(p) => (p.isSelected ? '#F4CFC6' : colors.ui.white)};
    border-radius: ${(p) => scale(p.size * 2)}px;
    margin-right: ${(p) => scale(p.size)}px;
    width: ${(p) => scale(p.size * 12)}px;
    min-height: ${(p) => Math.min(scale(p.size * 5), 65)}px;
    justify-content: center;
    align-items: center;
    margin-top: ${(p) => scale(p.size)}px;
    padding-left: ${(p) => scale(p.size)}px;
    padding-right: ${(p) => scale(p.size)}px;
    overflow: hidden;
    margin: 0 auto;
`;

const Gradient = styled(LinearGradient).attrs({
    colors: [colors.brand.tertiary, colors.brand.primaryAlt, colors.brand.primary],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 }
})`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 120%;
`;

const Label = styled.Text`
    color: white;
    font-weight: bold;
    font-size: ${(p) => scale(Math.min(Math.max(p.size * 1.4, 10), 20))}px;

`;
