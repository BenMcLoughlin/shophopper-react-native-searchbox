import React, { useRef, useState } from 'react';
import { SearchBase } from '@appbaseio/react-native-searchbox';
import styled from 'styled-components/native';
import { NavBar, IconButton } from '../components';
import { SearchBar, PopularSearches, SearchResults, FilterPopUp, SortResults } from './customComponents';

export const Search = () => {
    const bottomSheetRef = useRef(null);
    const [listStyle, setListStyle] = useState('grid');
    return (
        <Container>
            <SearchBase
                index="products-dev"
                url="https://shophopper-xaazcfr-arc.searchbase.io"
                credentials={'df889fd7bdcd:852d98f2-d95a-4333-9775-31631a48397b'}
                appbaseConfig={{
                    recordAnalytics: true,
                    enableQueryRules: true,
                    useCache: false
                }}>
                <NavBar
                    left={() => <IconButton icon="chevron-left" onPress={() => null} />}
                    center={() => <SearchBar />}
                    right={() => (
                        <ClickToOpenFilters onPress={() => bottomSheetRef.current.open()}>
                            <IconButton icon="filter-outline" size={30} onPress={() => bottomSheetRef.current.open()} />
                            <WhiteText>Filter</WhiteText>
                        </ClickToOpenFilters>
                    )}
                />
                <PopularSearches />
                <SortResults />
                <SearchResults bottomSheetRef={bottomSheetRef} listStyle={listStyle} setListStyle={setListStyle} />
                <FilterPopUp bottomSheetRef={bottomSheetRef} />
            </SearchBase>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
`;

const WhiteText = styled.Text`
    color: white;
`;
const ClickToOpenFilters = styled.TouchableOpacity`
    flex: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    height: 70px;
`;
