import CartItem from "./cart-item";
import { currencyFormat } from "../../utils/numericFormatters";
import styles from "./Cart.module.scss";
import { Key } from "react";

interface Product {
  discount: number;
  price: number;
  // Add any other properties of the product here
}

interface CartProps {
  cartItems: Product[];
  removeItemFromCart: (product: Product) => void;
}

export default function Cart({ cartItems, removeItemFromCart }: CartProps) {
  function getCartTotal() {
    const totalCost = cartItems.reduce(
      (prev: any, curr: { discount: number; price: number }) => {
        const itemPrice =
          curr.discount === 0 ? curr.price : curr.price * (1 - curr.discount);
        return prev + itemPrice;
      },
      0
    );

    return currencyFormat(totalCost);
  }

  function renderEmptyCart() {
    return (
      <div className={styles.emptyCart}>You have no items in your cart</div>
    );
  }

  function renderCart() {
    return (
      <ul className={styles.cart}>
        {cartItems.map((product: any, i: Key | null | undefined) => (
          <li className={styles.cartItem} key={i}>
            {
              <CartItem
                product={product}
                removeItemFromCart={removeItemFromCart}
              />
            }
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      {cartItems.length > 0 ? renderCart() : renderEmptyCart()}
      {cartItems.length > 0 ? (
        <div className={styles.total}>Total: {getCartTotal()}</div>
      ) : null}
    </div>
  );
}
