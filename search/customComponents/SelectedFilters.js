import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { IconButton } from '../../components/buttons/IconButton';
import { MultiSelect } from '../../components/formInputs/MultiSelect.js';
import { scale, asCurrency } from '../../utils';
import { colors } from '../../themes/colors';
import { StateContext } from '../../state/StateContext';
import { initialState } from '../../state/initialState';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { FiltersSelect } from './FiltersSelect';
import { SearchContext } from '@appbaseio/react-native-searchbox';
import { FILTER_IDS } from '../../state/globalVariables';

export const SelectedFilters = ({ bottomSheetRef, showChips = true }) => {
    const { state, setState } = useContext(StateContext);


    const searchBase = useContext(SearchContext);

    const [num, setNum] = useState(0);

    const is_in_filters_bottom_drawer = !bottomSheetRef;

    useEffect(() => {
        setNum(Object.values(state.filters).flat().length);
    }, [state.filters]);

    const clearFilters = () => {
        FILTER_IDS.forEach((filterId) => {
            const filterInstance = searchBase.getComponent(filterId);

            if (filterInstance) {
                filterInstance.setValue([], {
                    triggerDefaultQuery: true,
                    triggerCustomQuery: true,
                    stateChanges: true
                });

                filterInstance.setDataField([]);
            }
        });

        setState({ filters: initialState.filters });
    };

    return (
        <Wrapper>
            <Row>
                <Text>{num} Filters Selected</Text>
                {!is_in_filters_bottom_drawer && (
                    <IconButton icon="plus-circle" size={18} color={colors.grey.medium} onPress={() => bottomSheetRef.current.open()} />
                )}

                {num > 0 && (
                    <Clickable onPress={() => clearFilters()}>
                        <Text color={colors.brand.tertiary}>Clear Filters</Text>
                    </Clickable>
                )}
            </Row>
            {showChips && (
                <FlexBox>
                    <FiltersSelect id="sizes" dataField="sizes.keyword" show="selected" />
                    <FiltersSelect id={'buckets'} dataField="buckets.keyword" show="selected" />
                    <FiltersSelect id={'shops'} dataField="business_name.keyword" show="selected" />
                </FlexBox>
            )}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Wrapper = styled.View`
    justify-content: center;
    align-items: center;
    min-height: ${scale(80)}px;
    margin-bottom: 20px;
    flex-direction: column;
`;

const Label = styled.Text`
    color: ${(p) => (p.isSelected ? colors.brand.primary : colors.grey.darkest)};
    font-weight: normal;
    font-size: ${scale(10)}px;
`;

const Text = styled.Text`
    height: ${scale(18)}px;
    margin-left: 4px;
    margin-right: 5px;
    color: ${(p) => p.color || 'black'};
`;
const Row = styled.View`
    flex-direction: row;
    height: ${scale(30)}px;
    padding: 15px;
    align-content: center;
    justify-content: space-around;
    align-items: center;
`;
const FlexBox = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
`;
const Clickable = styled.TouchableOpacity`
    flex: 1;
    position: relative;
    elevation: -3;
    z-index: -3;
`;
const Close = styled(Icon)`
    height: 15px
    width: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 2px;
`;

const FilterButton = styled.TouchableOpacity`
    flex-direction: row;
    background: ${(p) => (p.isSelected ? '#F4CFC6' : colors.ui.white)};
    border-radius: ${(p) => scale(p.size)}px;
    margin-right: ${(p) => scale(p.size / 2)}px;
    min-width: ${(p) => scale(p.size * 12)}px;

    height: ${(p) => scale(p.size * 5)}px;
    justify-content: center;
    align-items: center;
    margin-top: ${(p) => scale(p.size / 2)}px;
    padding-left: ${(p) => scale(p.size)}px;
    padding-right: ${(p) => scale(p.size)}px;
    border: 1px solid ${(p) => (p.isSelected ? '#D3ABA3' : colors.ui.white)};
`;
