import React from 'react';
import style from './Footer.module.css';

function Footer(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <div>
        NHL and the NHL Shield are registered trademarks of the National Hockey
        League. NHL and NHL team marks are the property of the NHL and its teams. ©
        NHL 2023. All Rights Reserved. (© website created by AlexJavacat 2023)
      </div>
    </div>
  );
}

export default Footer;
