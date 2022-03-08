import React, { useContext } from 'react';
import { getHeaderHeight, getNavBarHeight, getScreenWidth, getScreenHeight, verticalScale } from '../../utils/sizes';
import { colors } from '../../themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StateContext } from '../../state/StateContext';
import { IconButton } from '../buttons/IconButton';

import styled from 'styled-components/native';

export const NavBar = ({ isFixed, children, isTransparent, goBack, left, center, right }) => {
    const { state } = useContext(StateContext);

    const { dropdownOpen } = state.ui;

    const gradient = isTransparent
        ? ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.1)', 'transparent']
        : [colors.brand.tertiary, colors.brand.primaryAlt, colors.brand.primary];

    const start = isTransparent ? { x: 0.5, y: 0.0 } : { x: 0, y: 0 };
    const end = isTransparent ? { x: 0.5, y: 1.0 } : { x: 1, y: 1 };
    const screenHeight = getScreenHeight();

    return (
        <Wrapper isFixed={isFixed} dropdownOpen={dropdownOpen}>
            <Gradient style={{ height: getHeaderHeight() }} colors={gradient} start={start} end={end} />
            <Bar screenHeight={screenHeight}>
                <LeftView>{left && left()}</LeftView>
                <CenterView>{center && center()}</CenterView>
                <RightView>{right && right()}</RightView>
            </Bar>
        </Wrapper>
    );
};

// ---------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
height: ${(p) => (p.dropdownOpen ? verticalScale(250) : getHeaderHeight())}px;
    flex-direction: row;
    background: transparent;
    overflow: visible;
    width: ${getScreenWidth()}px;
    position: ${(p) => (p.isFixed ? 'absolute' : 'relative')};
    top: 0;
    margin-top -20px;
    
`;
const Gradient = styled(LinearGradient)`
    height: ${getHeaderHeight()}px;
    width: 100%;
`;

const Bar = styled.View`
    position: relative;
    overflow: visible;
    height: ${getNavBarHeight()}px;
    position: absolute;
    top: ${verticalScale(35)}px;
    left: 0;
    right: 0;
    flex: 1;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const LeftView = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    elevation: 3;
    z-index: 5;
`;
const RightView = styled.View`
    flex: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
`;
const CenterView = styled.View`
    flex: 7;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
