import React, { useState } from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export const GridTile = ({ product, onPress }) => {
    const { title, variants, images } = product;
    const margin = 14;
    const width = 170;

    const [loading, setLoading] = useState(true);

    const lowestVariantPrice = Math.min(...product.variants.map((d) => d.price));
    const displayPrice = Math.max(product.original_price / 100, lowestVariantPrice);

    return (
        <Card width={width} margin={margin}>
            <Container onPress={onPress}>
                <ImageWrapper loading={loading}>
                    <ImageBackground resizeMode="cover" source={{ uri: images[0]?.src }} onLoad={() => setLoading(false)} />
                </ImageWrapper>

                <Info>
                    <ProductName>{title}</ProductName>
                    <BusinessName>{product.business_name}</BusinessName>
                    <PriceCompare>
                        {product.compare_at_price / 100 > displayPrice && <RegularPrice>$ {product.compare_at_price / 100}</RegularPrice>}
                    </PriceCompare>
                </Info>
            </Container>
        </Card>
    );
};

//  ----------------------------STYLES-------------------------------------------//

const Card = styled.View`
    background: white;
    border-radius: 8px;
    width: ${(p) => p.width}px;
    margin-top: ${(p) => p.margin}px;
    elevation: 2;
    z-index: 2;
    height: 300px;
    margin: 5px;
    border: 1px solid grey;
`;
const Container = styled.TouchableOpacity`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    flex: 1;
`;

const ImageWrapper = styled.View`
    flex: 1.5;
    background: ${(p) => (p.loading ? 'transparent' : 'white')};
`;

const ImageBackground = styled.ImageBackground`
    flex: 1;
`;

const Info = styled.View`
    padding: 10px;
    justify-content: space-between;
    flex: 1;
`;

const ProductName = styled.Text`
    padding: 5px;
    flex: 4;
    width: 100%;
    font-size: 14px;
    color: grey;
`;

const BusinessName = styled.Text`
    flex: 1;
    font-size: 12px;
    text-align: right;
`;
const PriceCompare = styled.View`
    flex-direction: row;
    flex: 1;
    flex-wrap: wrap;
`;
const RegularPrice = styled.Text`
    justify-content: space-between;
    text-align: center;
    text-decoration: line-through;
    font-size: 14px;
    font-weight: 200;
    color: grey;
    margin-left: 10px;
`;

const HeartIcon = styled(Icon)`
    position: absolute;
    top: 10px;
    left: 10px;
`;
