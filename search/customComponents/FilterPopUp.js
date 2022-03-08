import React, { useContext } from 'react';
import { Accordion } from '../../components/wrappers/Accordion';
import styled from 'styled-components/native';
import { scale } from '../../utils';
import { FiltersSelect } from './FiltersSelect';
import { SelectedFilters } from './SelectedFilters';
import { BottomSheet } from '../../components/layout/BottomSheet';
import { Button } from '../../components/buttons/Button';
import { SearchContext } from '@appbaseio/react-native-searchbox';
import { colors } from '../../themes/colors';
import { FILTER_IDS } from '../../state/globalVariables';
import { PriceFilter } from './PriceFilter';

export const FilterPopUp = ({ bottomSheetRef }) => {
    const searchBase = useContext(SearchContext);

    const applyFilters = () => FILTER_IDS.forEach((filterId) => searchBase.getComponent(filterId)?.triggerCustomQuery());

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
    };

    return (
        <Wrapper>
            <BottomSheet sheetRef={bottomSheetRef}>
                <SelectedFilters id="sizes" dataField="sizes.keyword" show={'clicked'} />
                <Accordion>
                    <Panel title="Size">
                        <FiltersSelect id="sizes" dataField="sizes.keyword" />
                    </Panel>
                    <Panel title="Categories">
                        <FiltersSelect id={'buckets'} dataField="buckets.keyword" />
                    </Panel>
                    <Panel title="Storefront">
                        <FiltersSelect id={'shops'} dataField="business_name.keyword" />
                    </Panel>
                    <Panel title="Gender">
                        <FiltersSelect id={'gender'} dataField="gender.keyword" />
                    </Panel>
                    <Panel title="Price Range">
                        <PriceFilter id={'price'} dataField="price.keyword" />
                    </Panel>
                </Accordion>
                <Buttons>
                    <Hr />
                    <Clickable
                        onPress={() => {
                            clearFilters();
                            bottomSheetRef.current.close();
                        }}>
                        <Text>Clear Filters</Text>
                    </Clickable>
                    <Button
                        label={'Apply Filters'}
                        onPress={() => {
                            bottomSheetRef.current.close();
                            applyFilters();
                        }}
                    />
                </Buttons>
            </BottomSheet>
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//
const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: ${scale(14)}px;
    justify-content: flex-end;
`;
const Panel = styled.View`
    position: relative;
    width: 100%;
    flex: 1;
    padding-bottom: 10px;
`;

const Text = styled.Text`
    height: ${scale(15)}px;
    margin-left: 5px;
    color: ${(p) => p.color || 'black'};
`;

const RemoveFilterButtons = styled.View`
    background: yellow;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Clickable = styled.TouchableOpacity`
    flex: 1;
    position: relative;
    elevation: -3;
    z-index: -3;
`;

const Buttons = styled.View`
    flex-direction: row;
    justify-content: space-around;
    height: 75px;
    position: relative;
    align-items: center;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
`;

const Hr = styled.View`
    height: 1px;
    width: 100%;
    background: ${colors.grey.light};
    position: absolute;
    top: 1px;
    margin-left: 7%;
`;
