import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../../themes/colors';
import { StateContext } from '../../state/StateContext';
import { getScreenWidth } from '../../utils';

export const WithLoadingSpinner = ({ children, loading }) => {
    const { state, setState } = useContext(StateContext);

    useEffect(() => {
        if (state.error?.message?.length > 0) {
            setTimeout(() => {
                setState({ error: { message: '' } });
            }, 3000);
        }
    }, [state.error?.message]);

    return (
        <Wrapper>
            {state.isLoading || loading ? (
                <Loading size={40} animating={true} color={colors.brand.primaryAlt} />
            ) : state.error?.message ? (
                <ErrorWrapper>
                    <ErrorCode>{state.error.code}</ErrorCode>
                    <Hr />
                    <Text>{state.error?.message}</Text>
                </ErrorWrapper>
            ) : (
                <>{children}</>
            )}
        </Wrapper>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Loading = styled(ActivityIndicator)`
    width: 30px;
`;
const Wrapper = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${getScreenWidth()}px;
    position: relative;
    elevation: -3;
    z-index: -3;
`;
const ErrorWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
`;
const Text = styled.Text`
    font-size: 14px;
    text-align: center;
`;
const ErrorCode = styled.Text`
    font-size: 28px;
    text-align: center;
`;
const Hr = styled.View`
    width: 1px;
    height: 100%;
    border: 1px solid grey;
    margin-left: 10px;
    margin-right: 10px;
`;
