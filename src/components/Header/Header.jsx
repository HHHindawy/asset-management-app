import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import profileImg from '../../img/profile.png';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <span className="title">PLN Asset Management System</span>
      <Avatar
        alt="Profile Avatar"
        src={profileImg}
        className="avatar"
      />
    </div>
  );
};

export default Header;
