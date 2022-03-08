import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../themes/colors';
import { scale } from '../../utils';
import styled from 'styled-components/native';

export const Tabs = ({ children, selectedTab }) => {
    const [currentTab, setCurrentTab] = useState(selectedTab);

    const renderTabHeader = () =>
        React.Children.map(children, (child, index) => (
            <TabItem onPress={() => setCurrentTab(index)}>
                <TabContent>
                    <Text weight={currentTab === index ? 'medium' : 'regular'} color="white">
                        {child.props.label}
                    </Text>
                    {currentTab === index && <SelectedTab />}
                </TabContent>
            </TabItem>
        ));

    return (
        <>
            <GradientBlock>
                <TabHeader horizontal showsHorizontalScrollIndicator={false}>
                    {renderTabHeader()}
                </TabHeader>
            </GradientBlock>
            {children[currentTab]}
        </>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const TabHeader = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexDirection: 'row',
        flexGrow: 1
    }
});

const TabItem = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;
const SelectedTab = styled.View`
    border: 1px solid ${colors.grey.dark}:
    bordercolor: ${colors.ui.white};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;
const TabContent = styled.View`
    padding-top: ${scale(10)}px;
    padding-bottom: ${scale(10)}px;
    paddinghorizontal: ${scale(14)}px;
`;

const GradientBlock = styled.View`
    background: yellow;
`;
const Text = styled.Text`
    background: yellow;
`;

Tabs.propTypes = {
    children: PropTypes.any.isRequired,
    selectedTab: PropTypes.number
};

Tabs.defaultProps = {
    selectedTab: 0
};
