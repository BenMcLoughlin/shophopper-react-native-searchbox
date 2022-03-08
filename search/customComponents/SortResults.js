import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { GradientBlock } from '../../components';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { colors } from '../../themes/colors';
import { startCase, scale } from '../../utils';
import styled from 'styled-components/native';
import { StateContext } from '../../state/StateContext';
import { FILTER_IDS } from '../../state/globalVariables';
import { verticalScale } from 'react-native-size-matters';

export const SortResults = ({ listStyle, setListStyle }) => {
    const searchBase = useContext(SearchContext);
    const { state, setState } = useContext(StateContext);

    const [sortBy, setSortBy] = useState('relevance');

    const otherIcon = listStyle === 'grid' ? 'list' : 'grid';

    const options = ['relevance', 'latest', 'discount', 'price'];

    return (
        <SearchComponent
            interval={1000}
            id="sortControls"
            type="search"
            value={null}
            customQuery={(searchComponent) => {
                if (!searchComponent.value) {
                    return {};
                }
                return {
                    sort: {
                        original_price: 'desc'
                    }
                };
            }}
            subscribeTo={['aggregationData', 'requestStatus', 'value', 'results']}
            URLParams
            aggregations={['min', 'max', 'histogram']}
            react={{
                and: ['search-component', 'result-component', ...FILTER_IDS.filter((d) => d !== 'sortControls')]
            }}
            // triggerQueryOnInit={!searchBase.getComponent(id)}
            destroyOnUnmount={false}
            render={({ setValue }) => {
                return (
                    <Wrapper>
                        {options.map((option) => {
                            const isSelected = sortBy === option;
                            return (
                                <Clickable
                                    key={option}
                                    onPress={() => setValue('original_price', { triggerCustomQuery: true, stateChanges: true })}>
                                    <Text isSelected={isSelected}>{startCase(option)}</Text>
                                    <Divider />
                                    {isSelected && <HighlightBorder />}
                                </Clickable>
                            );
                        })}
                    </Wrapper>
                );
            }}
        />
    );
};

//  ----------------------------STYLES-------------------------------------------//
const Wrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-left: ${scale(20)}px;
    padding-right: ${scale(14)}px;
    border-bottom-width: 1px;
    border-style: solid;
    border-bottom-color: ${colors.grey.light};
    background: ${colors.ui.white};
    width: 100%;
`;
const Divider = styled.View`
    margin-left: ${scale(14)}px;
    width: 1px;
    height: 80%;
    border-right-width: 1px;
    border-style: solid;
    border-right-color: ${colors.grey.light};
`;
const HighlightBorder = styled.View`
    position: absolute;
    bottom: 0;
    left: 12%;
    width: 60%;
    height: 1px;
    border-bottom-width: 4px;
    border-style: solid;
    border-bottom-color: ${colors.brand.primaryAlt};
`;

const Text = styled.Text`
    padding-top: ${verticalScale(10)}px;
    padding-bottom: ${verticalScale(10)}px;
    flex-direction: row;
    align-items: center;
    color: ${(p) => (p.isSelected ? colors.brand.primary : colors.grey.darkest)};
    font-weight: ${(p) => (p.isSelected ? 'bold' : '400')};
    font-size: ${scale(13)}px;
`;
const IconWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Clickable = styled.TouchableOpacity`
    padding-top: ${verticalScale(4)}px;
    padding-bottom: ${verticalScale(4)}px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${scale(80)}px;
`;
