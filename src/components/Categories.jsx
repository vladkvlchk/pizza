import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../redux/slices/filterSlice'

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();
  const value = useSelector(state => state.filter.category);

  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => {
          return (
            <li
              key={title + index}
              className={value === title ? 'active' : ''}
              onClick={() => {
                dispatch(setCategory(title));
              }}>
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
