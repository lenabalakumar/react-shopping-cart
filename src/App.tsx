import Product from "./components/Product";
import "./App.css";
import {
  Box,
  Button,
  HStack,
  Text,
  Drawer,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import React from "react";
import CartTile from "./components/cart/CartTile";

function App() {
  const cart = useAppSelector((state) => state.cartReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <div className="App">
      <div className="AppContainer">
        <HStack m={4} justifyContent="space-between">
          <Text>Products</Text>
          <Button ref={btnRef} onClick={onOpen}>
            Cart<Text>({cart.product.length})</Text>
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your cart</DrawerHeader>

              <DrawerBody>
                <Box display="flex" h="100%">
                  <VStack justifyContent="space-between" alignItems="end">
                    <Box>
                      {cart.product.map((cartItem) => {
                        return (
                          <CartTile
                            productID={cartItem.productID}
                            productName={cartItem.productName}
                            productImageURL={cartItem.productImageURL}
                            originalPrice={cartItem.originalPrice}
                            offerPrice={cartItem.offerPrice}
                            productDesc={cartItem.productDesc}
                            quantity={cartItem.quantity}
                          />
                        );
                      })}
                    </Box>
                    <Text>Total:{cart.total}</Text>
                  </VStack>
                </Box>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="green">Checkout</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>{" "}
        </HStack>
        <Product />
      </div>
    </div>
  );
}

export default App;
