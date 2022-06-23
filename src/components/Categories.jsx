import React from "react";

function Categories ({ items, onClick }){
    return(
        <div className="categories">
              <ul>
                <li className="active">Все</li>
                {items.map((name,index) => <li key={`${name}_${index}`}>{name}</li>)}
              </ul>
        </div>
    )
}

export default Categories