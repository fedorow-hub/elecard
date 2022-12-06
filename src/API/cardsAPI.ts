import axios from 'axios';

import {CardType} from "../Types/types";


export const CardAPI = {
  getCards () {
    let data = axios.get(`http://contest.elecard.ru/frontend_data/catalog.json`).then(response => response.data);

    let resultData = data.then(
        result => {
          const arrayFromStorage = getNumbersFromStorage();
          for(let i = 0; i < arrayFromStorage.length; i++) {
            // @ts-ignore
              result = result.filter(u => u.timestamp != arrayFromStorage[i])
          }
          return result
        }
    )
    return resultData;
  },
};

export const ActionWithLocalStorage = {
  write(number: number) {
    localStorage.setItem(`${number}`, `${number}`)
  },
  clearing() {
    localStorage.clear();
  }
}

const getNumbersFromStorage = () => {
  let myArray = [];
  for(let i = 0; i< localStorage.length; i++) {
    myArray.push(Number(localStorage.key(i)))
  }
  return myArray;
}
