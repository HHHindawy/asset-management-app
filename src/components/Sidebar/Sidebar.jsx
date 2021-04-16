import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import logo from '../../img/logo.png';
import './Sidebar.scss';

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedSubTab, setSelectedSubTab] = useState(1);

  const tabs = [
    {
      title: 'Vehicles',
      icon: 'directions_car_outlined',
    },
    {
      title: 'Report',
      icon: 'description_outlined',
      subTabs: [
        {
          title: 'Operating Cost',
        },
        {
          title: 'Fuel History',
        },
        {
          title: 'Total Cost',
        },
        {
          title: 'Cost/Meter',
        },
        {
          title: 'Expense Summary',
        },
        {
          title: 'Utilization',
        },
        {
          title: 'Maintenance',
        },
        {
          title: 'Service',
        },
      ],
    },
    {
      title: 'People',
      icon: 'person_outline_outlined',
    },
  ];

  return (
    <List
      component="nav"
      aria-labelledby="sidebar"
      subheader={
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
      }
      className="sidebar"
    >
      {tabs.map((tab, tabIndex) => (
        <>
          <ListItem
            className={`tab ${
              selectedTab === tabIndex ? 'tab--selected' : ''
            }`}
            button
            onClick={() => setSelectedTab(tabIndex)}
          >
            {tab.icon && <Icon className="icon">{tab.icon}</Icon>}
            <ListItemText primary={tab.title} />
          </ListItem>
          {tab.subTabs &&
            selectedTab === tabIndex &&
            tab.subTabs.map((subTab, subTabIndex) => (
              <ListItem
                className={`sub-tab ${
                  selectedSubTab === subTabIndex
                    ? 'sub-tab--selected'
                    : ''
                }`}
                button
                onClick={() => setSelectedSubTab(subTabIndex)}
              >
                {subTab.icon && (
                  <Icon className="icon">{subTab.icon}</Icon>
                )}
                <ListItemText primary={subTab.title} />
              </ListItem>
            ))}
        </>
      ))}
    </List>
  );
};

export default Sidebar;
