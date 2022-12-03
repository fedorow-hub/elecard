import axios from 'axios';

import {CardType} from "../Types/types";

type GetCardResponseType = {
  items: Array<CardType>
}

export const CardAPI = {
  getCards() {
    let data = axios.get<GetCardResponseType>(`http://contest.elecard.ru/frontend_data/catalog.json`).then(response => response.data);
    return data;
  },
};
