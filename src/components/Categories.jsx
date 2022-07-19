import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setActiveCategory } from '../redux/slices/filterSlice'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const dispatch = useDispatch();
  const activeCategory = useSelector(state => state.filter.activeCategory);

  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => {
          return (
            <li
              key={title + index}
              className={activeCategory === title ? 'active' : ''}
              onClick={() => {
                dispatch(setActiveCategory(title));
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
