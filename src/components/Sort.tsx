import React from 'react';
import { useSelector } from 'react-redux';
import { setCurrentSort } from '../redux/slices/filter/slice';
import { selectFilterCurrentSort } from '../redux/slices/filter/selectors';
import { UseAppDispatch } from '../redux/store';

export const sortList = [
  { name: 'популярности (DESC)', property: 'rating' },
  { name: 'популярности (ASC)', property: '-rating' },
  { name: 'цене (DESC)', property: 'price' },
  { name: 'цене (ASC)', property: '-price' },
  { name: 'алфавиту (DESC)', property: 'title' },
  { name: 'алфавиту (ASC)', property: '-title' },
];

function Sort() {
  const value = useSelector(selectFilterCurrentSort);
  const dispatch = UseAppDispatch();
  const componentRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClickSort = (newSort: { name: string; property: string }) => {
    setIsOpen(false);
    dispatch(setCurrentSort(newSort));
  };

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.path.includes(componentRef.current)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={componentRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => {
              return (
                <li
                  key={obj.name}
                  className={value.name === obj.name ? 'active' : ''}
                  onClick={() => onClickSort(obj)}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
