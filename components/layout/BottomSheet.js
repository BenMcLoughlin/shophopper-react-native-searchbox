import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { scale, getScreenHeight } from '../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button, IconButton } from '../buttons';
import styled from 'styled-components/native';
import { colors } from '../../themes/colors';

export const BottomSheet = ({ children, sheetRef, buttonText, onPress, height = getScreenHeight() * 0.9, ...otherProps }) => {
    const onButtonPress = () => {
        sheetRef.current.close();
        if (onPress) {
            onPress();
        }
    };

    return (
        <RBSheet closeOnDragDown={false} height={height} ref={sheetRef} {...otherProps}>
            <SafeArea>
                <Close>
                    <IconButton icon="close" color={colors.grey.dark} onPress={() => sheetRef.current.close()} />
                </Close>
                {children}
                {buttonText && (
                    <Buttons>
                        <Hr />

                        <View style={{ padding: scale(14) }}>
                            <Button size={10} label={buttonText} onPress={() => onButtonPress()} />
                        </View>
                    </Buttons>
                )}
            </SafeArea>
        </RBSheet>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const SafeArea = styled.SafeAreaView`
    flex: 1;
`;
const Close = styled.View`
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 9;
    elevation: 9;
`;

const Buttons = styled.View`
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    position: relative;
    margin-top: 15px;
`;

const Hr = styled.View`
    height: 1px;
    width: 80%;
    background: ${colors.grey.light};
    position: absolute;
`;
