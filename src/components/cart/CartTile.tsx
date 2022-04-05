import { Image, Text, Box, HStack, VStack, Button } from "@chakra-ui/react";
import { Product } from "../productTile";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../features/cart/cartSlice";

const CartTile = (cartItem: Product) => {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Box
        w="100%"
        h={100}
        // bg="purple"
        m={2}
        boxShadow="lg"
        borderRadius="lg"
        display="flex"
        p={3}
        borderWidth={1}
      >
        <Box
          w="33%"
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={cartItem.productImageURL}
            objectFit="cover"
            w={75}
            h={75}
            borderRadius="lg"
          ></Image>
        </Box>
        <Box w="33%" flex={2}>
          <VStack alignItems="start" px={2}>
            <HStack justifyContent="space-between" w="100%">
              <Text fontSize="x-small" fontWeight="bold">
                {cartItem.productName}
              </Text>
              <Text fontSize="x-small">Rs. {cartItem.offerPrice}</Text>{" "}
            </HStack>
            <HStack alignItems="center" alignSelf="end">
              <Button
                colorScheme="green"
                size="xs"
                onClick={() => dispatch(decrementQuantity(cartItem))}
              >
                -
              </Button>
              <Text fontSize="x-small">{cartItem.quantity}</Text>
              <Button
                colorScheme="green"
                size="xs"
                onClick={() => dispatch(incrementQuantity(cartItem))}
              >
                +
              </Button>
            </HStack>
            <Text fontSize="x-small" alignSelf="end">
              subtotal: {cartItem.quantity * cartItem.offerPrice}
            </Text>
          </VStack>
        </Box>
        <Box
          w="33%"
          display="flex"
          flex={0.5}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            borderWidth={1}
            boxShadow="md"
            onClick={() => dispatch(removeItem(cartItem))}
          >
            D
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartTile;
