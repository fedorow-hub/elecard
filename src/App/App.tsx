import React from 'react';
import './App.module.css';
import Header from "../Header/header";
import Footer from "../Footer/footer";
import s from "./App.module.css";
import CardsContainer from "../Content/cardsContainer";

function App() {
  return (
    <div className={s.wrapper}>
      <Header/>
      <CardsContainer/>
      <Footer/>
    </div>
  );
}

export default App;
