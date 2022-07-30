import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/img/empty-cart.png';

const CartEmpty : React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty 😕
      </h2>
      <p>
        Most likely, you didn't add the item to your cart.
        <br />
        To order pizza go to the main page.
      </p>
      <img src={image} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Come back</span>
      </Link>
    </div>
  );
}

export default CartEmpty;
