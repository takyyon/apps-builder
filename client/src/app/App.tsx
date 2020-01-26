// @ts-ignore
import React, { useState, useEffect } from 'react';
import './App.scss';
import { appTheme, ThemeContext } from './ThemeContext';
import { Match } from "@reach/router";
import { Site } from 'tabler-react';
import logo from './../assets/images/logo.png';
import Admin from './admin/Admin';
import "tabler-react/dist/Tabler.css";
import Main from './main/Main';
import Login from './login/Login';
import AuthService from './login/Auth.service';

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
  const [path, setPath] = useState('');
  const [user, setUser] = useState(undefined);
  const [accountDropdown, setAccountDropdown] = useState({});

  const setAdminNavBar = () => {
    setNavBar(defaultNavBar);
  };

  const setMainNavBar = () => {
    setNavBar([]);
  };
  
  const signOut = () => {
    AuthService.logout();
    setUser(undefined);
    setMainNavBar();
  };

  useEffect(() => {
    if(!!user){
      const currentUser = user || {};
      setAccountDropdown({
        avatarURL: currentUser['icon'] || '',
        name: currentUser['name'] || '',
        description: 'Administrator',
        options: [
          // { icon: "user", value: "Profile" },
          // { icon: "settings", value: "Settings" },
          // { icon: "mail", value: "Inbox", badge: "6" },
          // { icon: "send", value: "Message" },
          // { isDivider: true },
          // { icon: "help-circle", value: "Need help?" },
          { icon: "log-out", value: "Sign out", onClick: signOut },
        ],
      });
    } else {
      setAccountDropdown({});
    }
  }, [user]);
  useEffect(() => {
    if(path.startsWith('admin') && !!AuthService.getToken()) {
      setAdminNavBar();
    }else {
      setMainNavBar();
    }
  }, [path]);
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if(!!userFromStorage) {
      try{
        const jsonUser = JSON.parse(userFromStorage);
        setUser({...jsonUser});
      }catch (err) {

      }
      
    }
  }, []);
  return (
    <ThemeContext.Provider value={theme}>
      <Site.Wrapper
        headerProps={{
          href: '/',
          alt: 'Apps Builder',
          imageURL: logo,
          accountDropdown: {...accountDropdown},
        }}
        navProps={{
          itemsObjects: navBar
        }}
      >
        <Match path='/*'>
          {
            matchProps => {
              const token = AuthService.getToken();
              if(!!matchProps.match) {
                const currentPath = matchProps.match['*'];
                if(path.toLowerCase() !== currentPath.toLowerCase()){
                  setPath(currentPath);
                }
                if(currentPath.startsWith('admin')) {
                  if(!token) {
                    return <Login path={path} setUser={setUser} />;
                  }
                  if(navBar.length === 0) {
                    setAdminNavBar();
                  }
                  return <Admin />;
                }
                if(path.startsWith('login') && !token) {
                  return <Login path={path} setUser={setUser} />;
                }
              }
              return <Main />;
            }
          }
        </Match>
      </Site.Wrapper>
    </ThemeContext.Provider>
  );
}

export default App;
