import React from 'react';
import { useSelector } from 'react-redux';
import { UseAppDispatch } from '../redux/store'
import { setActiveCategory } from '../redux/slices/filter/slice';
import { selectFilterActiveCategory } from '../redux/slices/filter/selectors';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const dispatch = UseAppDispatch();
  const activeCategory: string = useSelector(selectFilterActiveCategory);

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
};

export default Categories;
