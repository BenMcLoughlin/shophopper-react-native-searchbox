import React, { useState } from 'react';
import { scale } from '../../utils';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';
import colors from '../../themes/colors';

export const ListTile = ({ product, parentMargin, onPress }) => {
    const { title, images } = product;

    const [loading, setLoading] = useState(true);

    return (
        <Card parentMargin={parentMargin}>
            <Container onPress={onPress}>
                {loading && (
                    <LoadingContainer>
                        <Loading size={40} animating={true} color={colors.brand.primaryAlt} />
                    </LoadingContainer>
                )}
       
                <ImageWrapper loading={loading}>
                    <ImageBackground resizeMode="cover" source={{ uri: images[0]?.src }} onLoad={() => setLoading(false)} />
                </ImageWrapper>
                <Info>
                    <ProductName>{title}</ProductName>
                    <BusinessName>{product.business_name}</BusinessName>
                    <PriceCompare>
                        <SalePrice onSale={product.is_on_sale}>$ {product.original_price / 100}</SalePrice>

                        {product.compare_at_price > 0 && <RegularPrice>$ {product.compare_at_price / 100}</RegularPrice>}
                    </PriceCompare>
                </Info>
            </Container>
        </Card>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Card = styled.View`
    background: ${colors.ui.white};
    border-radius: ${scale(8)}px;
    height: ${scale(85)}px;
    width: ${scale(320)}px;
    margin-top: ${scale(18)}px;
    box-shadow: 2px 5px 15px #c7c7c7;
    elevation: 2;
    z-index: 2;
    margin: 5px;
`;
const Container = styled.TouchableOpacity`
    border-radius: ${scale(8)}px;
    flex-direction: row;
    overflow: hidden;
    flex: 1;
`;

const ImageWrapper = styled.View`
    flex:1
    background: ${(p) => (p.loading ? 'transparent' : 'white')};
`;
const ImageBackground = styled.ImageBackground`
    flex: 1;
`;

const Info = styled.View`
    padding: ${scale(10)}px;
    justify-content: space-between;
    flex-direction: column;
    flex: 2;
`;

const ProductName = styled.Text`
    padding: 5px;
    flex: 2;
    width: 80%;
    font-size: ${scale(10)}px;
    color: ${colors.grey.darkest};
`;

const BusinessName = styled.Text`
    flex: 1.2;
    font-size: ${scale(10)}px;
    text-align: right;
`;
const PriceCompare = styled.View`
    flex-direction: row;
    justify-content: space-around;
    flex: 1.4;
    padding-bottom: 5px;
`;
const RegularPrice = styled.Text`
    justify-content: space-between;
    text-align: center;
    text-decoration: line-through;
    font-size: ${scale(12)}px;
    font-weight: 200;
    color: ${colors.grey.darker};
    margin-left: 10px;
`;

const SalePrice = styled(RegularPrice)`
    text-decoration: none;
    color: ${(p) => (p.onSale ? colors.ui.red : colors.grey.darkest)};
    font-weight: 400;
`;

const Absolute = styled.View`
    position: absolute;
    top: -10px;
    right: -10px;
`;

const Loading = styled(ActivityIndicator)``;
const LoadingContainer = styled.View`
    height: 10%;
    padding-top: 55px;
    position: absolute;
    top: 2%;
    left: 10%;
    margin: 0 auto;
`;
