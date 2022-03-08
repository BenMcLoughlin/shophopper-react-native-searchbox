import React, { useRef } from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import { scale, getScreenWidth, getScreenHeight } from '../../utils';
import { colors } from '../../themes/colors';
import { BottomSheet } from '../layout/BottomSheet';
import styled from 'styled-components/native';
import { MultiSelect } from '../formInputs/MultiSelect';

export const BottomPopSelect = ({ selectedValues, options, optionTitle, onPress }) => {
    const sheetRef = useRef(null);

    return (
        <Wrapper>
            <ClickToOpen onPress={() => sheetRef.current.open()}>
                <Text>{`${optionTitle}`}</Text>
                <Icon name="chevron-down" size={scale(14)} color={colors.grey50} />
            </ClickToOpen>
            <SelectedOptions>
                <MultiSelect options={selectedValues} selectedValues={selectedValues} onPress={onPress} size={4} showCloseIcon={true} />
            </SelectedOptions>

            <BottomSheet sheetRef={sheetRef} buttonText="Confirm" height={getScreenHeight() / 1.5}>
                <Text>{`${optionTitle}`}</Text>
                <MultiSelect options={options} selectedValues={selectedValues} onPress={onPress} size={7} />
            </BottomSheet>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    margin-top: ${verticalScale(20)}px;
    flex-direction: column;
`;
const ClickToOpen = styled.TouchableOpacity`
    background-color: ${colors.ui.white};
    width: ${getScreenWidth() * 0.7}px;
    padding: ${verticalScale(8)}px;
    border-radius: ${scale(4)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${verticalScale(7)}px;
    height: 40px;
    border: 2px solid ${(p) => (p.isFocused ? colors.brand.primary : colors.grey.light)};
`;
const SelectedOptions = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    width: ${getScreenWidth() * 0.7}px;
`;

const Text = styled.Text`
    height: 50px;
    padding-top: 15px;
    padding-left: 15px;
    flex-direction: row;
    align-content: center;
    color: ${(p) => (p.isSelected ? colors.brand.tertiary : colors.grey.darkest)};
`;
