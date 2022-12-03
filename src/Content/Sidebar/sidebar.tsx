import React from "react";
import s from "./sidebar.module.css"

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <h3>Сортировка и выборка</h3>
      <div className={s.selection}>
        <label>
          <input id="selection-category" type="radio" name="selection"/>
          Выборка по категории
        </label>
        <label>
          <input id="date-sort" type="radio" name="selection"/>
          Сортировка по дате
        </label>
        <label>
          <input id="size-sort" type="radio" name="selection"/>
          Сортировка по размеру
        </label>
      </div>
      <div>Выборка по категории</div>
      <select>
        <option>Все категории</option>
        <option>Животные</option>
        <option>Бизнесс</option>
        <option>Еда</option>
        <option>Здоровье</option>
        <option>Природа</option>
        <option>Наука</option>
        <option>Транспорт</option>
        <option>Зима</option>
      </select>
      <div>Сортировка по дате</div>
      <select >
        <option>По возрастанию</option>
        <option>По убыванию</option>
      </select>

      <div>Сортировка по размеру файла</div>
      <select >
        <option>По возрастанию</option>
        <option>По убыванию</option>
      </select>


    </div>
  )
}

export default Sidebar;
