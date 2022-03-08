import React, { useState, useEffect } from 'react';
import { getScreenHeight } from '../sizes';

export function useTransparentNav() {
    const [navBarIsTransparent, setNavBarIsTransparent] = useState(false);
    const onScroll = ({
        nativeEvent: {
            contentOffset: { y }
        }
    }) => {
        setNavBarIsTransparent(y > getScreenHeight() * 0.2);
    };

    return [!navBarIsTransparent, onScroll];
}
