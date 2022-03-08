import React from 'react';
import { TouchableOpacity } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { scale } from '../../utils';
import { colors } from '../../themes/colors';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import styled from 'styled-components/native';

export const TabBar = ({ state, descriptors, navigation }) => {
    const isLoggedIn = false;

    const icons = {
        Home: {
            active: 'home',
            inactive: 'home-outline'
        },
        Favourites: {
            active: 'heart',
            inactive: 'heart'
        },
        Profile: {
            active: 'account',
            inactive: 'account-outline'
        },
        Cart: {
            active: 'cart',
            inactive: 'cart-outline'
        }
    };

    return (
        <Wrapper>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                       null
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingVertical: verticalScale(8)
                        }}
                        key={route.key}>
                        <Icon
                            name={icons[route.name].inactive}
                            color={isFocused ? colors.brand.tertiary : colors.grey.medium}
                            size={scale(25)}
                        />

                        <Text font="h5" isFocused={isFocused} weight="medium">
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${colors.ui.white};
    border: 1px solid ${colors.grey.light};
`;
const Text = styled.Text`
    color: ${(p) => (p.isFocused ? colors.brand.tertiary : colors.grey.dark)};
`;
