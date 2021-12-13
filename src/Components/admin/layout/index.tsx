import React, { useState, useRef, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import themes from './themes';
import {
  Layout,
  LayoutContent,
  LayoutContainer,
  LayoutColumns,
  LayoutColumn,
} from '@paljs/ui/Layout';
import icons from '@paljs/icons';
import { SidebarBody, SidebarRefObject, Sidebar } from '@paljs/ui/Sidebar';
import Header from './Header';
import SimpleLayout from './SimpleLayout';
import { useRouter } from 'next/router';
import { EvaIcon } from '@paljs/ui/Icon';
import { Button } from '@paljs/ui/Button';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import Link from 'next/link';
import menuItems from './menuItem';
import Auth from '../../Auth/auth';
import SEO, { SEOProps } from './SEO';
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
    <Auth className="antialiased w-full">
      <SEO {...rest} />
      <ThemeProvider theme={themes('default', dir)}>
        <Fragment>
          <SimpleLayout />
          <Layout evaIcons={icons} dir={dir} className={!authLayout ? 'auth-layout' : ''}>
            {!authLayout && (
              <Header
                dir={dir}
                changeDir={changeDir}
                toggleSidebar={() => sidebarRef.current?.toggle()}
              />
            )}
            <LayoutContainer>
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
              <LayoutContent className="overflow-y-scroll">
                <LayoutColumns>
                  <LayoutColumn className="main-content">{children}</LayoutColumn>
                </LayoutColumns>
                {/* {!authLayout && <Footer />} */}
              </LayoutContent>
            </LayoutContainer>
          </Layout>
        </Fragment>
      </ThemeProvider>
    </Auth>
  );
};

export default LayoutPage;
