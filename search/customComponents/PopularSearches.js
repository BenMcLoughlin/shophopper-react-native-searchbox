import React from 'react';
import { ScrollView } from 'react-native';
import { GradientBlock } from '../../components';
import { colors } from '../../themes/colors';
import { scale } from '../../utils';
import styled from 'styled-components/native';

const items = ['casual', 'OKGN', 'crewneck', 'formal wear', 'shorts'];

export const PopularSearches = ({ onPress }) => {
    return (
        <Gradient>
            <Title>Popular:</Title>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((option) => (
                    <Clickable key={option} onPress={() => onPress(option)}>
                        <Label>{option}</Label>
                    </Clickable>
                ))}
            </ScrollView>
        </Gradient>
    );
};

//  ----------------------------STYLES-------------------------------------------//
const Gradient = styled(GradientBlock)`
    padding-left: ${scale(14)}px;
    padding-right: ${scale(14)}px;
    padding-top: ${scale(10)}px;
    padding-bottom: ${scale(10)}px;
    flex-direction: row;
    align-items: center;
    z-index: 1;
    background: yellow;
`;
const Label = styled.Text`
    color: ${colors.ui.white};
`;
const Title = styled.Text`
    color: ${colors.ui.white};
`;
const Clickable = styled.TouchableOpacity`
    padding-left: ${scale(10)}px;
    padding-right: ${scale(10)}px;
    padding-top: ${scale(2)}px;
    padding-bottom: ${scale(2)}px;
    background: ${colors.brand.primary};
    border-radius: ${scale(20)}px;
    margin-left: ${scale(5)}px;
`;
