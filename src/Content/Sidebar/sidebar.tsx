import React, { useState } from "react";
import s from "./sidebar.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/store";
import {setCurrentPage} from "../../Redux/func-reducer";
import {recoveryCard, setCategory, sortByDate, sortBySize} from "../../Redux/card-reducer";

type MapStateToPropsType = {

}

type MapDispatchToPropsType = {
    setCategory: (category: string) => void
    sortByDate: () => void
    sortBySize: () => void
    setCurrentPage: (page: number) => void
    recoveryCard: () => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const Sidebar: React.FC<PropsType> = ({setCategory, sortByDate, sortBySize, setCurrentPage, recoveryCard}) => {

    const [value, setValue] = useState(1);

    function changeValue(e: any) {
        setValue(e.target.value);
        if(e.target.value === "1") {
            sortByDate();
            setCurrentPage(2);//костыли, чтобы вызвать перерендер
            setCurrentPage(1);
        }
        if(e.target.value === "2") {
            sortBySize();
            setCurrentPage(2);
            setCurrentPage(1);
        }
    }

    const [valueCategory, setValueCategory] = useState('');

    function changeCategory(e: any) {
        setValueCategory(e.target.value);
        setCategory(e.target.value);
    }

    const recovery = () => {
        recoveryCard()
    }

  return (
    <div className={s.sidebar}>
      <h3 className={s.title}>Сортировка</h3>
      <div className={s.selection}>
          <label className={s.label}>
              <input type="radio" name="radio" value="1"
                     checked={value === 1 ? true : false}
                     onChange={changeValue} />
              Сортировка по дате
          </label>
          <label className={s.label}>
              <input type="radio" name="radio" value="2"
                     checked={value === 2 ? true : false}
                     onChange={changeValue} />
              Сортировка по размеру
          </label>
      </div>
      <h3>Выборка по категориям</h3>
      <select className={s.select} value={valueCategory} onChange={changeCategory}>
        <option value="all">Все категории</option>
        <option value="animals">Животные</option>
        <option value="business">Бизнесс</option>
        <option value="food">Еда</option>
        <option value="health">Здоровье</option>
        <option value="places">Места</option>
        <option value="science">Наука</option>
        <option value="vehicle">Транспорт</option>
        <option value="winter">Зима</option>
      </select>
        <button onClick={recovery} className={s.button} >Восстановить удаленные карточки</button>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{

    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            setCategory,
            sortByDate,
            sortBySize,
            setCurrentPage,
            recoveryCard
        })
)(Sidebar);


