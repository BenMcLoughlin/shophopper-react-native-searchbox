import React, { useState, useContext } from 'react';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { colors } from '../../themes/colors';
import { startCase, scale } from '../../utils';
import styled from 'styled-components/native';
import { StateContext } from '../../state/StateContext';
import { FILTER_IDS } from '../../state/globalVariables';
import { verticalScale } from 'react-native-size-matters';
import { IconButton } from '../../components/buttons/IconButton';

export const SortResults = ({ listStyle, setListStyle }) => {
    const searchBase = useContext(SearchContext);
    const { state, setState } = useContext(StateContext);

    const searchResultsInstance = searchBase.getComponent('search-component');

    const [selected, setSelected] = useState('relevance');

    const otherIcon = listStyle === 'grid' ? 'list' : 'grid';

    const options = ['relevance', 'latest', 'discount', 'price'];

    const options2 = [
        { label: 'relevance', dataField: '_score', sortBy: 'desc' },
        { label: 'latest', dataField: 'date', sortBy: 'desc' },
        { label: 'discount', dataField: 'discount', sortBy: 'desc' },
        { label: 'price', dataField: 'original_price', sortBy: 'asc' }
    ];

    return (
        <SearchComponent
            interval={1000}
            id="SortResults"
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
            react={{
                and: ['search-component', 'results-component', ...FILTER_IDS]
            }}
            // triggerQueryOnInit={!searchBase.getComponent(id)}
            destroyOnUnmount={false}
            render={({ setValue }) => {
                return (
                    <Wrapper>
                        {options2.map(({ label, dataField, sortBy }) => {
                            const isSelected = selected === label;
                            return (
                                <Clickable
                                    key={label}
                                    onPress={() => {
                                        /*-----------------------------------------------------------------------------------------------------------------
                                         Attempt 1 - set the state hardcoded to sort by _id
                                         - problem - doesnt reset state

                                         setState({ sortOptions: { dataField: newValue } });
                                             
                                         */

                                        let newValue = state.sortOptions.dataField === 'original_price' ? 'id' : 'original_price';

                                        /*-----------------------------------------------------------------------------------------------------------------
                                         Attempt 2 - set the data field directly on searchResult component and trigger custom query
                            

                                      searchResultsInstance?.setDataField('id', {
                                            triggerCustomQuery: true // to trigger the results query
                                        });


                                         */

                                        /* -----------------------------------------------------------------------------------------------------------------
                                        Attempt 3 - set state, then trigger custom query
                                         - problem - doesnt work...

                                            setState({ sortOptions: { dataField: 'id' } });
                                            searchResultsInstance.triggerCustomQuery()
                                      

                                        setState({ sortOptions: { dataField: 'id' } });
                                        searchResultsInstance?.triggerCustomQuery();
   */
                                        setState({ sortOptions: { dataField: newValue } });
                                        
                                        searchResultsInstance?.setValue('hat', {
                                            triggerCustomQuery: true // to trigger the results query
                                        });
                                        // console.log(searchResultsInstance);

                                        setSelected(label);
                                    }}>
                                    <Text isSelected={isSelected}>{startCase(label)}</Text>
                                    <Divider />
                                    {isSelected && <HighlightBorder />}
                                </Clickable>
                            );
                        })}
                        <IconWrapper>
                            <IconButton
                                icon={`view-${otherIcon}-outline`}
                                color={colors.grey.dark}
                                onPress={() => setListStyle(listStyle === 'grid' ? 'list' : 'grid')}
                            />
                        </IconWrapper>
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
