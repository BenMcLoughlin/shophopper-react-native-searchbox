import { View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../themes/colors';
import { scale, camelCase } from '../../utils';
import styled from 'styled-components/native';
import { IconButton } from '../buttons/IconButton';
import Label from './parts/Label';

export const TextField = ({ initialValue, label, labelColor, multiline, value, secureTextEntry, onChangeText, handleErrors }) => {
    const [isFocused, setFocused] = useState(false);
    // const [value, setValue] = useState(initialValue);

    const [blurred, setBlurred] = useState(false);
    const [wasValid, setWasValid] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (blurred || wasValid) {
            const errorMessage = handleErrors && handleErrors(value);
            setError(errorMessage);
        } else if (error) {
            setWasValid(true);
        }
    }, [value, handleErrors, blurred, error, wasValid]);

    let refinedValue = value || value >= 0 ? value.toString().replace(/^0+/, '') : value;

    const inputRef = useRef(null);

    const [isSecureVisible, setSecureVisible] = useState(secureTextEntry);

    const isActive = value !== null && value !== '';

    const labelProps = {
        isActive,
        isFocused,
        isError: null,
        onPress: () => inputRef?.current?.focus(),
        focusedColor: 'red',
        baseColor: 'blue'
    };

    return (
        <View>
            <InputContainer isFocused={isFocused}>
                <Input
                    defaultValue={initialValue}
                    value={value}
                    autoCapitalize="none"
                    onFocus={() => setFocused(true)}
                    onEndEditing={() => setFocused(false)}
                    ref={(ref) => {
                        inputRef.current = ref;
                    }}
                    secureTextEntry={isSecureVisible}
                    onChangeText={onChangeText}
                    underlineColorAndroid="transparent"
                    multiline={multiline}
                />
            </InputContainer>
            {secureTextEntry && (
                <ChangeHiddenText>
                    <IconButton
                        icon={isSecureVisible ? 'eye-off' : 'eye'}
                        color={colors.grey.dark}
                        size={scale(15)}
                        onPress={() => setSecureVisible(!isSecureVisible)}
                    />
                </ChangeHiddenText>
            )}
            {label && <Label {...labelProps}>{label}</Label>}
            <Error>{error}</Error>
        </View>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const InputContainer = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: ${scale(3)}px;
    border: 2px solid ${(p) => (p.isFocused ? colors.brand.primary : colors.grey.light)};
    margin-top: 30px;
    position: relative;
    background: white;
`;

const Input = styled.TextInput`
    min-height: ${scale(40)}px;
    padding: 10px;
    width: 90%;
`;

const ChangeHiddenText = styled.View`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 45px;
    right: 10px;
`;

const Error = styled.View`
    position: absolute;
    top: 69px;
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    color: ${colors.ui.red};
`;
