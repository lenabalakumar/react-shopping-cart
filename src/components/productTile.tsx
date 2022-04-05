import { useAppDispatch, useAppSelector } from "../app/hooks";
import React from "react";
import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { addItem } from "../features/cart/cartSlice";
import Product from "./Product";

export interface Product {
  productID: number;
  productName: string;
  productDesc: string;
  productImageURL: string;
  originalPrice: number;
  offerPrice: number;
  quantity: number;
}

const productTile = (data: Product) => {
  const [inCart, setInCart] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleClick = (product: Product) => {
    // inCart ? dispatch(addItem({ product: data })) : "";
    if (inCart) {
      dispatch(addItem(data));
      setInCart(true);
    }
  };

  return (
    <Box
      h={100}
      w={400}
      borderRadius="lg"
      borderWidth={1}
      m={4}
      display="flex"
      alignItems="center"
      justifyContent="start"
      boxShadow="md"
    >
      <HStack p={2}>
        <Image
          w={75}
          h={75}
          borderRadius="sm"
          src={data.productImageURL}
          objectFit="cover"
          alt="product image"
        ></Image>
        <Box w={200} h={75}>
          <VStack alignItems="start" m={0}>
            <HStack justifyContent="space-between" w={200}>
              <Text fontSize="small" fontWeight="bold">
                {data.productName}
              </Text>
              <Badge variant="solid" colorScheme="green">
                <Text>
                  sale:{" "}
                  {(
                    ((data.originalPrice - data.offerPrice) /
                      data.originalPrice) *
                    100
                  ).toFixed(0)}
                  %
                </Text>
              </Badge>
            </HStack>
            <Text fontSize="x-small">{data.productDesc}</Text>
            <HStack alignItems="baseline">
              <Text fontSize="x-small" as="s">
                Rs. {data.originalPrice}
              </Text>
              <Text fontSize="small">Rs. {data.offerPrice}</Text>
            </HStack>
          </VStack>
        </Box>
        {data.quantity != 0 && (
          <Button onClick={() => dispatch(addItem(data))}>Buy now</Button>
        )}
      </HStack>
    </Box>
  );
};

export default productTile;
