import React, { useContext } from 'react';
import { SearchComponent, SearchContext } from '@appbaseio/react-native-searchbox';
import styled from 'styled-components/native';
import { FILTER_IDS } from '../../state/globalVariables';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { StateContext } from '../../state/StateContext';

export const PriceFilter = ({ id, dynamic = true, aggregationSize }) => {
    const searchBase = useContext(SearchContext);
    const { state, setState } = useContext(StateContext);

    return (
        <SearchComponent
            interval={1000}
            id="price"
            type="range"
            dataField={'original_price'}
            subscribeTo={['aggregationData', 'requestStatus', 'value', 'results']}
            URLParams
            value={{
                start: state.priceRange.bottom,
                end: state.priceRange.top
            }}
            aggregations={['min', 'max', 'histogram']}
            aggregationSize={aggregationSize}
            react={
                dynamic
                    ? {
                          and: ['search-component', ...FILTER_IDS.filter((d) => d !== 'price')]
                      }
                    : undefined
            }
            triggerQueryOnInit={!searchBase.getComponent(id)}
            destroyOnUnmount={false}
            render={({ value, setValue }) => {
                return (
                    <Wrapper>
                        <MultiSlider
                            enableLabel
                            min={0}
                            max={2000}
                            step={10}
                            values={[value.start / 100, value.end / 100]}
                            onValuesChangeFinish={(newValues) => {
                                setValue(
                                    {
                                        ...value,
                                        start: newValues[0] * 100,
                                        end: newValues[1] * 100
                                    },
                                    {
                                        triggerDefaultQuery: false,
                                        triggerCustomQuery: true,
                                        stateChanges: true
                                    }
                                );

                                setState({
                                    priceRange: {
                                        bottom: newValues[0] * 100,
                                        top: newValues[1] * 100
                                    }
                                });
                            }}
                        />
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
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding-top: 50px;
`;
