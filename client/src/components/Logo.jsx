import React from 'react';

import appLogo from './../assets/icons/logo.png';

export default function Logo(props) {
  const appLogoStyle = {
    marginRight: '10px'
  };
  return (
    <a href="/" style={appLogoStyle}>
      <img src={appLogo} width={props.width} alt="logo" />
    </a>
  );
};