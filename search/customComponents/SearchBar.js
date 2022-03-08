import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { scale } from '../../utils';
import { SearchBox, SearchContext } from '@appbaseio/react-native-searchbox';
import { FILTER_IDS } from '../../state/globalVariables';
import { MaterialIcons, Feather, Ionicons, MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Text } from 'react-native';
import { StateContext } from '../../state/StateContext';

export const SearchBar = () => {
    const searchBase = useContext(SearchContext);
    const { state, setState } = useContext(StateContext);

    const [focus, setFocus] = useState(false);

    const clearFilters = () => {
        FILTER_IDS.forEach((filterId) => {
            const filterInstance = searchBase.getComponent(filterId);

            if (filterInstance) {
                filterInstance.setValue([], {
                    triggerDefaultQuery: true,
                    stateChanges: true
                });
            }
        });
    };

    return (
        <SearchBox
            id="search-component"
            dataField={[
                {
                    field: 'title',
                    weight: 3
                },
                {
                    field: 'business_name',
                    weight: 1
                }
            ]}
            sortOptions={['price', 'original_price', 'desc']}
            value={state.search.text}
            onChange={(value) => setState({ search: { text: value } })}
            renderNoSuggestion={() => <Text>No suggestions found</Text>}
            autosuggest={true}
            enableRecentSearches
            // showAutoFill={false}
            enablePopularSuggestions
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            maxPopularSuggestions={3}
            enablePredictiveSuggestions
            goBackIcon={(props) => <Ionicons {...props} />}
            autoFillIcon={(props) => <Feather name="arrow-up-left" {...props} />}
            recentSearchIcon={(props) => <MaterialIcons name="history" {...props} />}
            react={{
                and: FILTER_IDS
            }}
            onValueChange={(d) => clearFilters()}
            showIcon={false}
            searchHeaderStyle={{ position: 'absolute' }}
            searchBarProps={{
                containerStyle: {
                    width: 300,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    marginLeft: 40,
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent'
                },
                inputContainerStyle: {
                    backgroundColor: 'white',
                    width: scale(230),
                    height: scale(30),
                    borderWidth: 1,
                    borderColor: focus ? 'grey' : 'transparent',
                    borderRadius: 100
                },
                rightIconContainerStyle: { backgroundColor: 'transparent' },
                leftIconContainerStyle: { backgroundColor: 'transparent' }
            }}
        />
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Title = styled.Text`
    flex: 1;
    font-size: 50px;
`;
