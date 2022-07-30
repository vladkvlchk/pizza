import React from 'react';
import { useSelector } from 'react-redux';
import { UseAppDispatch } from '../redux/store';
import { Link } from 'react-router-dom';

import { addItem } from '../redux/slices/cart/slice';
import { selectCartCountOfSingleItems } from '../redux/slices/cart/selectors';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: string[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = UseAppDispatch();
  const [activeSize, setActiveSize] = React.useState<number>(sizes[0]);
  const [activeType, setActiveType] = React.useState<string>(types[0]);
  const countItem = useSelector(selectCartCountOfSingleItems({ id, activeType, activeSize }));

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      price,
      title,
      size: activeSize,
      type: activeType,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={type + '_' + index}
              className={activeType === type ? 'active' : ''}
              onClick={() => {
                setActiveType(type);
              }}>
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size + '_' + index}
              className={activeSize === size ? 'active' : ''}
              onClick={() => {
                setActiveSize(size);
              }}>
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} ₴</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Buy</span>
          {countItem ? <i>{countItem.count}</i> : <></>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
