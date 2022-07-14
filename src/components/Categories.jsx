function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => {
          return (
            <li
              key={title + index}
              className={value === title ? 'active' : ''}
              onClick={() => {
                onChangeCategory(title);
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
