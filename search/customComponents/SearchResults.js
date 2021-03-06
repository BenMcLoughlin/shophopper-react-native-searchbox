import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { scale } from '../../utils';
import { colors } from '../../themes/colors';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { WithLoadingSpinner } from '../../components/wrappers/WithLoadingSpinner';
import { GridTile, ListTile } from '../../components/tiles';
import { ActivityIndicator } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SortControls } from '../../components/formInputs/SortControls';
import { SelectedFilters } from './SelectedFilters';
import { FILTER_IDS } from '../../state/globalVariables';
import { StateContext } from '../../state/StateContext';

export const SearchResults = ({ navigation, bottomSheetRef, listStyle }) => {
    const Tile = listStyle === 'grid' ? GridTile : ListTile;

    const { state, setState } = useContext(StateContext);
    const searchBase = useContext(SearchContext);
    const { sortOptions } = state;

    console.log('dataField', sortOptions.dataField);
    console.log('options', state.sortOptions);

    return (
        <SearchComponent
            id="results-component"
            dataField={sortOptions.dataField}
            sortBy={sortOptions.sortBy}
            size={10}
            react={{
                and: ['search-component', 'popular', ...FILTER_IDS]
            }}
            preserveResults={true}>
            {({ results, loading, size, from, setValue, setFrom, setSortBy, triggerCustomQuery, setDataField }) => {
                return (
                    <WithLoadingSpinner loading={loading && (!from || from === 0)}>
                        <Container variant={listStyle}>
                            <Title>{results.numberOfResults.toLocaleString()}</Title>
                            {results.data ? (
                                <FlatList
                                    extraData={false}
                                    data={results.data}
                                    key={listStyle}
                                    keyboardShouldPersistTaps={'handled'}
                                    horizontal={false}
                                    numColumns={listStyle === 'grid' ? 2 : 1}
                                    ListHeaderComponent={
                                        <Header>
                                            <NumberOfResults>
                                                {results.numberOfResults.toLocaleString()} results found in {results.time}ms
                                            </NumberOfResults>
                                            <SelectedFilters bottomSheetRef={bottomSheetRef} />
                                        </Header>
                                    }
                                    ListFooterComponent={
                                        <Bottom>
                                            {results.numberOfResults - 10 < from ? (
                                                <Text> {results.numberOfResults} Results</Text>
                                            ) : (
                                                <Loading size={50} animating={true} color={colors.grey.darkest} />
                                            )}
                                        </Bottom>
                                    }
                                    onEndReachedThreshold={0.5}
                                    onEndReached={() => {
                                        const offset = (from || 0) + size;
                                        if (results.numberOfResults > offset) {
                                            setFrom((from || 0) + size);
                                        }
                                    }}
                                    renderItem={({ item }) => {
                                        return (
                                            <Tile
                                                onPress={() => navigation.navigate('Product', { product: item })}
                                                key={item.id}
                                                product={item}
                                            />
                                        );
                                    }}
                                    keyExtractor={(item, index) => item._id + index}
                                />
                            ) : (
                                <Text>Nothing Found:</Text>
                            )}
                        </Container>
                    </WithLoadingSpinner>
                );
            }}
        </SearchComponent>
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
const Container = styled.View`
    flex: 1;
    padding-right: ${scale(14)}px;
    padding-left: ${scale(14)}px;
    padding-bottom: ${scale(10)}px;
    justify-content: space-around;
`;

const Header = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: ${-scale(14)}px;
`;
const Bottom = styled.View`
    height: ${scale(100)}px;
    width: ${scale(100)}px;
    margin: 0 auto;
    margin-bottom: 35px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
const Text = styled.Text`
    width: ${scale(100)}px;
    margin: 20px auto;
`;
const NumberOfResults = styled.Text`
    margin: 20px auto;
`;
const DummyButton = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    background: red;
`;

const Loading = styled(ActivityIndicator)``;
