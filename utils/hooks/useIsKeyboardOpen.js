import React, { useEffect, useContext, useState } from 'react';
import { Keyboard } from 'react-native';

export function useIsKeyboardOpen() {
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return keyboardStatus;
}
