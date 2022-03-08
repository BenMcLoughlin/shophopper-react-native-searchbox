import React, { useRef } from 'react';
import { SearchBase } from '@appbaseio/react-native-searchbox';
import styled from 'styled-components/native';
import { NavBar, IconButton } from '../components';
import { SearchBar, PopularSearches, SearchResults, FilterPopUp } from './customComponents';

export const Search = ({ navigation }) => {
    const bottomSheetRef = useRef(null);

    return (
        <Container>
            <SearchBase
                index="products-dev"
                url="ASK_BEN_AT_dev@shophopper.ca"
                credentials={"ASK_BEN_AT_dev@shophopper.ca"}
                appbaseConfig={{
                    recordAnalytics: true,
                    enableQueryRules: true,
                    useCache: false
                }}>
                <NavBar
                    left={() => <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />}
                    center={() => <SearchBar />}
                    right={() => (
                        <ClickToOpenFilters onPress={() => bottomSheetRef.current.open()}>
                            <IconButton icon="filter-outline" size={30} onPress={() => bottomSheetRef.current.open()} />
                            <WhiteText>Filter</WhiteText>
                        </ClickToOpenFilters>
                    )}
                />
            
                <PopularSearches />
                <SearchResults navigation={navigation} bottomSheetRef={bottomSheetRef} />
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
