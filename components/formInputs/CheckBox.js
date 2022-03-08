import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

export const CheckBox = ({ onPress, label, value }) => {
    return (
        <Wrapper onPress={() => onPress(!value)}>
            <Box isChecked={value} />
            <Title>{label}</Title>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.TouchableOpacity`
    height: 40px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
const Title = styled.Text`
    flex: 1;
    font-size: 14px;
`;
const Box = styled.View`
    font-size: 10px;
    background: ${(p) => (p.isChecked ? colors.brand.primaryAlt : 'transparent')};
    border: 2px solid ${(p) => (p.isChecked ? colors.brand.tertiary : colors.grey.medium)};
    border-radius: 50px;
    height: 13px;
    width: 13px;
    margin-left: 10px;
    margin-right: 10px;
`;
