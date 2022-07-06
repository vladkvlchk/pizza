import React, { useState } from 'react';

function Categories({ onClick }) {
  const [activeCategoria, setActiveCategoria] = useState('Все');
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((title)=>{
          return <li 
          className={activeCategoria === title ? 'active' : ''} 
          onClick={()=>{setActiveCategoria(title)}}
          >
            {title}
          </li>

        })}
      </ul>
    </div>
  );
}

export default Categories;
