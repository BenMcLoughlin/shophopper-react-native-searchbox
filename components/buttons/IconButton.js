import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { scale } from '../../utils';

export const IconButton = ({ icon, size = 24, onPress, label, color = 'white', className }) => {
    return (
        <Wrapper onPress={onPress} className={className}>
            <Icon size={scale(size)} name={icon} color={color} />
            {label && <Text color={color}>{label}</Text>}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.TouchableOpacity`
    align-items: center;
    min-height: ${scale(20)}px;
`;

const Text = styled.Text`
    color: ${(p) => p.color};
`;
