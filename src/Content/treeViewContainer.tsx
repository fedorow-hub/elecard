import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/store";
import {getCards} from "../Redux/card-selector";
import {CardType} from "../Types/types";
import s from "./treeViewContainer.module.css"
import close from "./../img/delete.svg";
import "./treeViewContainer.css";

type MapStateToPropsType = {
    cards: Array<CardType>
}

type MapDispatchToPropsType = {}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const TreeViewContainer: React.FC<PropsType> = ({cards}) => {

    const setImages = (category: string): any => {
        return cards.filter(card => card.category == category)
            .map(u => <button className={s.link} key={u.timestamp} onClick={()=>setPopup([u.image, true])}>
                <img className={s.image} src={`http://contest.elecard.ru/frontend_data/${u.image}`}/></button>
            )
    }

    const [popup, setPopup] = useState(['', false]);

    useEffect(() => {
        const parentElement = document.querySelector('.treeViewContainer_main__1s4mG');

        if(popup[1]) {
            const elementPopupBody = document.createElement('div');
            elementPopupBody.className = 'popup';
            elementPopupBody.insertAdjacentHTML("afterbegin",
                `<div class='popupBody'>
                    <div class='popupContent'>                                              
                        <img src='http://contest.elecard.ru/frontend_data/${popup[0]}'/>
                    </div>
                </div>`)
            // @ts-ignore
            parentElement.append(elementPopupBody);

            const parentForButton = document.querySelector('.popupContent');
            const elementCloseButton = document.createElement('button');
            elementCloseButton.className = 'popupButton'
            elementCloseButton.onclick = () => setPopup(['', false]);
            elementCloseButton.insertAdjacentHTML("afterbegin",
                `<img src=${close}/>`)
            // @ts-ignore
            parentForButton.append(elementCloseButton)

            return function cleanup() {
                elementPopupBody.remove()
            };
        }
    },[popup]);

    return (
        <div className={s.main}>
            <div className={s.container}>
                <div className={s.treeHTML}>
                    <h2>
                        Все изображения
                    </h2>
                    <details className={s.mainDetails}>
                        <summary className={s.mainSummary}></summary>
                        <div>Животные
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("animals")}
                                </div>
                            </details>
                        </div>
                        <div>Бизнесс
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("business")}
                                </div>
                            </details>
                        </div>
                        <div>Еда
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("food")}
                                </div>
                            </details>
                        </div>
                        <div>Здоровье
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("health")}
                                </div>
                            </details>
                        </div>
                        <div>Места
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("places")}
                                </div>
                            </details>
                        </div>
                        <div>Наука
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("science")}
                                </div>
                            </details>
                        </div>
                        <div>Транспорт
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("vehicle")}
                                </div>
                            </details>
                        </div>
                        <div>Зима
                            <details>
                                <summary></summary>
                                <div className={s.wrapImages}>
                                    {setImages("winter")}
                                </div>
                            </details>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{
        cards: getCards(state)
    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
        })
)(TreeViewContainer);
