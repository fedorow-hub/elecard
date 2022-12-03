import preloader from '../img/Basketball.gif';
import s from './preloader.module.css';


const Preloader = () => {
  return (
    <div className={s.main}>
      <img className={s.gif} src={preloader} alt="preloader" />
    </div>
  );
};
export default Preloader;
