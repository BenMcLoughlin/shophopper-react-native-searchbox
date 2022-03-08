import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { GradientBlock } from '../../components';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { colors } from '../../themes/colors';
import { scale } from '../../utils';
import styled from 'styled-components/native';
import { StateContext } from '../../state/StateContext';
import { FILTER_IDS } from '../../state/globalVariables';

const items = ['casual', 'OKGN', 'crewneck', 'formal wear', 'shorts'];

export const PopularSearches = ({ onPress }) => {
    const searchBase = useContext(SearchContext);
    const { state, setState } = useContext(StateContext);

    return (
        <SearchComponent
            interval={1000}
            id="popular"
            type="search"
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
            value=""
            subscribeTo={['aggregationData', 'requestStatus', 'value', 'results']}
            URLParams
            aggregations={['min', 'max', 'histogram']}
            react={{
                and: ['search-component', 'result-component', ...FILTER_IDS.filter((d) => d !== 'popular')]
            }}
            // triggerQueryOnInit={!searchBase.getComponent(id)}
            destroyOnUnmount={false}
            render={({ value, setValue }) => {
                console.log('/PopularSearches.js - value: ', value);
                return (
                    <Gradient>
                        <Title>Popular:</Title>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {items.map((option) => (
                                <Clickable
                                    key={option}
                                    onPress={() => {
                                        setValue(option, {
                                            triggerDefaultQuery: true,
                                            stateChanges: true
                                        });
                                    }}>
                                    <Label>{option}</Label>
                                </Clickable>
                            ))}
                        </ScrollView>
                    </Gradient>
                );
            }}
        />
    );
};

//  ----------------------------STYLES-------------------------------------------//
const Gradient = styled(GradientBlock)`
    padding-left: ${scale(14)}px;
    padding-right: ${scale(14)}px;
    padding-top: ${scale(10)}px;
    padding-bottom: ${scale(10)}px;
    flex-direction: row;
    align-items: center;
    z-index: 1;
    background: yellow;
`;
const Label = styled.Text`
    color: ${colors.ui.white};
`;
const Title = styled.Text`
    color: ${colors.ui.white};
`;
const Clickable = styled.TouchableOpacity`
    padding-left: ${scale(10)}px;
    padding-right: ${scale(10)}px;
    padding-top: ${scale(2)}px;
    padding-bottom: ${scale(2)}px;
    background: ${colors.brand.primary};
    border-radius: ${scale(20)}px;
    margin-left: ${scale(5)}px;
`;
