import React, { useState, Children } from 'react';
import styled from 'styled-components/native';
import { scale, verticalScale } from '../../utils';
import { colors } from '../../themes/colors';
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Swipe = ({ children, handleCompletion }) => {
    return (
        <Swiper
            containerStyle={{ flex: 1 }}
            activeDotColor={colors.brand.primary}
            showsButtons={true}
            prevButton={<MaterialCommunityIcons name="chevron-left" size={30} color="black" />}
            dotStyle={{ backgroundColor: 'white' }}
            keyboardShouldPersistTaps="handled"
            buttonWrapperStyle={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                position: 'absolute',
                top: verticalScale(520),
                left: 0,
                height: 80,
                paddingHorizontal: scale(40),
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            loop={false}
            nextButton={
                <NextButton>
                    <ClickableText>Next</ClickableText>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="black" />
                </NextButton>
            }>
            {children}
        </Swiper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const SkipButton = styled.TouchableOpacity``;

const ClickableText = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;
const NextButton = styled.View`
    font-size: 18px;
    width: ${scale(60)}px;
    font-weight: bold;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;
