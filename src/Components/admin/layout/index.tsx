/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';

import icons from '@paljs/icons';
import { Button } from '@paljs/ui/Button';
import { EvaIcon } from '@paljs/ui/Icon';
import {
  Layout,
  LayoutContent,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
} from '@paljs/ui/Layout';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import AdminAuth from '../../Auth/admin-auth';
import Header from './Header';
import menuItems from './menuItem';
import SEO, { SEOProps } from './SEO';
import SimpleLayout from './SimpleLayout';
import themes from './themes';
// import Footer from '../../Footer';

// const getDefaultTheme = (): DefaultTheme['name'] => {
//   if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
//     return localStorage.getItem('theme') as DefaultTheme['name'];
//   } else {
//     const hours = new Date().getHours();
//     return hours > 6 && hours < 19 ? 'default' : 'dark';
//   }
// };

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const sidebarRef = useRef<SidebarRefObject>(null);
  const router = useRouter();
  const [menuState, setMenuState] = useState(false);
  const menuRef = useRef<MenuRefObject>(null);
  const [seeHeader, setSeeHeader] = useState(true);

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  const changeDir = () => {
    const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
    setDir(newDir);
  };

  const authLayout = router.pathname.startsWith('/auth');

  return (
    <AdminAuth className="antialiased w-full">
      <SEO {...rest} />
      <ThemeProvider theme={themes('default', dir)}>
        <>
          <SimpleLayout />
          <Layout
            evaIcons={icons}
            dir={dir}
            className={!authLayout ? 'auth-layout w-full' : 'w-full'}
          >
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer className="w-full">
              {!authLayout && (
                <Sidebar
                  getState={getState}
                  ref={sidebarRef}
                  property="start"
                  containerFixed
                  responsive
                  className="menu-sidebar"
                >
                  {seeHeader && (
                    <header>
                      <Button
                        size="Tiny"
                        status="Primary"
                        onClick={() => {
                          setMenuState(!menuState);
                          menuRef.current?.toggle();
                        }}
                        fullWidth
                      >
                        {menuState ? (
                          <EvaIcon name="arrow-circle-up" />
                        ) : (
                          <EvaIcon name="arrow-circle-down" />
                        )}
                      </Button>
                    </header>
                  )}
                  <SidebarBody>
                    <Menu
                      nextJs
                      className="sidebar-menu"
                      Link={Link}
                      ref={menuRef}
                      items={menuItems}
                      currentPath={router.pathname}
                      toggleSidebar={() => sidebarRef.current?.hide()}
                    />
                  </SidebarBody>
                </Sidebar>
              )}
              <LayoutContent className="flex flex-1">
                <LayoutColumns>
                  <LayoutColumn className="main-content max-full max-w-full">
                    {children}
                  </LayoutColumn>
                </LayoutColumns>
                {/* {!authLayout && <Footer />} */}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </>
      </ThemeProvider>
    </AdminAuth>
  );
};

export default LayoutPage;
