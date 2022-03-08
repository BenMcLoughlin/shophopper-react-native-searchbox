import React, { useContext } from 'react';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import { ToggleSelect } from '../../components/buttons/ToggleSelect';
import styled from 'styled-components/native';
import { StateContext } from '../../state/StateContext';
import { FILTER_IDS } from '../../state/globalVariables';

export const FiltersSelect = ({ id, dataField, dynamic = true, aggregationSize, show = 'all' }) => {
    const searchBase = useContext(SearchContext);

    const { state, setState } = useContext(StateContext);

    const applyFilters = () => FILTER_IDS.forEach((filterId) => searchBase.getComponent(filterId)?.triggerCustomQuery());

    return (
        <SearchComponent
            id={id}
            type="term"
            dataField={dataField}
            subscribeTo={['aggregationData', 'requestStatus', 'value']}
            URLParams
            aggregationSize={aggregationSize}
            react={
                dynamic
                    ? {
                          and: ['search-component', ...FILTER_IDS]
                      }
                    : undefined
            }
            triggerQueryOnInit={!searchBase.getComponent(id)}
            destroyOnUnmount={false}
            render={({ aggregationData, loading, value, setValue }) => {
                const options = loading ? state.filters?.[id] : aggregationData.data;

                return (
                    <Wrapper>
                        {options
                            .sort((a, b) => a._key.split('')[0].localeCompare(b._key.split('')[0]))
                            .map((item) => {
                                return (
                                    (show === 'all' || state.filters?.[id].map((d) => d._key).includes(item._key)) && (
                                        <ToggleSelect
                                            key={item._key}
                                            value={value ? value.includes(item._key) : false}
                                            label={item._key}
                                            size={show === 'selected' ? 4 : 7}
                                            count={item._doc_count}
                                            showCloseIcon={show === 'selected'}
                                            onValueChange={() => {
                                                let values = value || [];

                                                if (values.includes(item._key)) {
                                                    values = values.filter((d) => d !== item._key);
                                                    setState({ filters: { [id]: state.filters[id].filter((d) => d._key !== item._key) } });
                                                } else {
                                                    values = [...values, item._key];
                                                    setState({ filters: { [id]: [...state.filters[id], item] } });
                                                }

                                                setValue(values, {
                                                    triggerDefaultQuery: false,
                                                    stateChanges: true
                                                });

                                                if (show === 'selected') {
                                                    applyFilters();
                                                }
                                            }}
                                        />
                                    )
                                );
                            })
                            .filter((d) => d)}
                    </Wrapper>
                );
            }}
        />
    );
};

const Wrapper = styled.View`
    min-width: 50%;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`;
