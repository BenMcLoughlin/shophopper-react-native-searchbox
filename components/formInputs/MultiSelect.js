import React from 'react';
import styled from 'styled-components/native';
import { scale, startCase } from '../../utils';
import { colors } from '../../themes/colors';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export const MultiSelect = ({ selectedValues, options, onPress, size = 7, showCloseIcon }) => {
    return (
        <Wrapper size={size} options={options}>
            {options?.map((option) => {
                let isSelected = selectedValues.includes(option);
                return option === 'spaceSeperator' ? (
                    <SpaceSeperator size={size} />
                ) : (
                    <FilterButton key={option} label={option} onPress={() => onPress(option)} isSelected={isSelected} size={size}>
                        <Label isSelected={isSelected} size={size}>
                            {startCase(option)}
                        </Label>
                        {showCloseIcon && <Close name="close" size={15} color={'grey'} />}
                    </FilterButton>
                );
            })}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    padding: ${(p) => scale(p.size)}px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: ${(p) => (p.size > 6 ? 'center' : 'flex-start')};
    width: 100%;
`;

const SpaceSeperator = styled.View`
    min-height: ${(p) => scale(p.size * 5)}px;
    width: 100%;
`;

const FilterButton = styled.TouchableOpacity`
    flex-direction: row;
    background: ${(p) => (p.isSelected ? '#F4CFC6' : colors.ui.white)};
    border-radius: ${(p) => scale(p.size)}px;
    margin-right: ${(p) => scale(p.size)}px;
    min-width: ${(p) => scale(p.size * 12)}px;

    min-height: ${(p) => scale(p.size * 5)}px;
    justify-content: center;
    align-items: center;
    margin-top: ${(p) => scale(p.size)}px;
    padding-left: ${(p) => scale(p.size)}px;
    padding-right: ${(p) => scale(p.size)}px;
    border: 1px solid ${(p) => (p.isSelected ? '#D3ABA3' : colors.grey.medium)};
`;
const Label = styled.Text`
    color: ${colors.grey.darkest};
    font-weight: normal;
    font-size: ${(p) => scale(Math.max(p.size * 1.2, 10))}px;
`;
const Close = styled(Icon)`
    height: 15px
    width: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 2px;
`;
