// @ts-ignore
import React, { useState } from 'react';
import './App.scss';
import { appTheme, ThemeContext } from './ThemeContext';
import { Match } from "@reach/router";
import { Site } from 'tabler-react';
import logo from './../assets/images/logo.png';
import Admin from './admin/Admin';
import "tabler-react/dist/Tabler.css";
import Main from './main/Main';

const defaultNavBar = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    useExact: true,
  },
  {
    value: 'Apps',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/apps',
        useExact: true,
      },
    ],
  },
  {
    value: 'Features',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/features',
        useExact: true,
      },
    ],
  },
  {
    value: 'Categories',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/categories',
        useExact: true,
      },
    ],
  },
  {
    value: 'Tags',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/tags',
        useExact: true,
      },
    ],
  },
  {
    value: 'Platforms',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/platforms',
        useExact: true,
      },
    ],
  },
  {
    value: 'Problems',
    icon: 'box',
    subItems: [
      {
        value: 'List',
        to: '/admin/problems',
        useExact: true,
      },
    ],
  },
];

const App: React.FC = () => {
  const [theme, /* setTheme */] = useState(appTheme);
  const [navBar, setNavBar] = useState<Array<any>>([]);

  const changeNavBar = (admin: boolean) => {
    if(admin && navBar !== defaultNavBar) {
      setNavBar(defaultNavBar);
    }else if(!admin && navBar.length > 0) {
      setNavBar([]);
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: 'Apps Builder',
          imageURL: logo,
        }}
        navProps={{
          itemsObjects: navBar
        }}
      >
        <Match path='/login/*'>
          {
            matchProps => {
              changeNavBar(!!matchProps.match);
              return matchProps.match ? <Admin /> : <Main />;
            }
          }
        </Match>
        <Match path='/admin/*'>
          {
            matchProps => {
              changeNavBar(!!matchProps.match);
              return matchProps.match ? <Admin /> : <Main />;
            }
          }
        </Match>
      </Site.Wrapper>
    </ThemeContext.Provider>
  );
}

export default App;
