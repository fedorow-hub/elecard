import React from "react";
import s from "../Footer/footer.module.css";

const Footer = () => {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.content}>
          тел: +7(902)911-65-40
        </div>
      </div>
    </footer>
  )
}

export default Footer;
