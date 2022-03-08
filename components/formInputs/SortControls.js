import React, { useState } from 'react';
import { verticalScale } from 'react-native-size-matters';
import { colors } from '../../themes/colors';
import { IconButton } from '../buttons/IconButton';
import styled from 'styled-components/native';
import { startCase, scale, getScreenWidth } from '../../utils';

export const SortControls = ({ listStyle, setListStyle }) => {
    const options = ['relevance', 'latest', 'discount', 'price'];

    const [sortBy, setSortBy] = useState('relevance');

    const otherIcon = listStyle === 'grid' ? 'list' : 'grid';

    return (
        <Wrapper>
            {options.map((option) => {
                const isSelected = sortBy === option;
                return (
                    <Clickable key={option} onPress={() => setSortBy(option)}>
                        <Text isSelected={isSelected}>{startCase(option)}</Text>
                        <Divider />
                        {isSelected && <HighlightBorder />}
                    </Clickable>
                );
            })}
            <IconWrapper>
                <IconButton
                    icon={`view-${otherIcon}-outline`}
                    color={colors.grey.dark}
                    onPress={() => setListStyle(listStyle === 'grid' ? 'list' : 'grid')}
                />
            </IconWrapper>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-left: ${scale(20)}px;
    padding-right: ${scale(14)}px;
    border-bottom-width: 1px;
    border-style: solid;
    border-bottom-color: ${colors.grey.light};
    background: ${colors.ui.white};
    width: 100%;
`;
const Divider = styled.View`
    margin-left: ${scale(14)}px;
    width: 1px;
    height: 80%;
    border-right-width: 1px;
    border-style: solid;
    border-right-color: ${colors.grey.light};
`;
const HighlightBorder = styled.View`
    position: absolute;
    bottom: 0;
    left: 12%;
    width: 60%;
    height: 1px;
    border-bottom-width: 4px;
    border-style: solid;
    border-bottom-color: ${colors.brand.primaryAlt};
`;

const Text = styled.Text`
    padding-top: ${verticalScale(10)}px;
    padding-bottom: ${verticalScale(10)}px;
    flex-direction: row;
    align-items: center;
    color: ${(p) => (p.isSelected ? colors.brand.primary : colors.grey.darkest)};
    font-weight: ${(p) => (p.isSelected ? 'bold' : '400')};
    font-size: ${scale(13)}px;
`;
const IconWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Clickable = styled.TouchableOpacity`
    padding-top: ${verticalScale(4)}px;
    padding-bottom: ${verticalScale(4)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${scale(80)}px;
`;
