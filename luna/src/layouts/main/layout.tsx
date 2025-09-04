'use client';

import type { Breakpoint } from '@mui/material/styles';
import type { NavItemProps, NavSectionProps } from 'src/components/nav-section';
import type { MainSectionProps, HeaderSectionProps, LayoutSectionProps } from '../core';

import { merge } from 'es-toolkit';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';
import { AppBar, Toolbar, Typography, Button, Container, Stack, Avatar, Menu, MenuItem, Divider, Tooltip, IconButton } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useRouter, usePathname } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { useAuthStore } from 'src/store/auth.store';

import { allLangs } from 'src/locales';
import { _contacts, _notifications } from 'src/_mock';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import { useMockedUser } from 'src/auth/hooks';

import { NavMobile } from './nav-mobile';
import { VerticalDivider } from './content';
import { NavVertical } from './nav-vertical';
import { NavHorizontal } from './nav-horizontal';
import { _account } from '../nav-config-account';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../nav-config-workspace';

import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { LanguagePopover } from '../components/language-popover';
import { ContactsPopover } from '../components/contacts-popover';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { navData as dashboardNavData } from '../nav-config-dashboard';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { NotificationsDrawer } from '../components/notifications-drawer';
import { MainSection, layoutClasses, HeaderSection, LayoutSection } from '../core';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    nav?: {
      data?: NavSectionProps['data'];
    };
    main?: MainSectionProps;
  };
};

export default function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'md',
}: MainLayoutProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const navData = slotProps?.nav?.data ?? dashboardNavData;

  const isNavMini = settings.state.navLayout === 'mini';
  const isNavHorizontal = settings.state.navLayout === 'horizontal';
  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';

  const canDisplayItemByRole = (allowedRoles: NavItemProps['allowedRoles']): boolean =>
    !allowedRoles?.includes(user?.role);

  const renderHeader = () => (
    <HeaderSection
      layoutQuery={layoutQuery}
      {...slotProps?.header}
      slots={{
        ...slotProps?.header?.slots,
        leftArea: (
          <>
            {/* 모바일에서만 헤더에 로고 표시 */}
            {isMobile && <Logo />}
            {slotProps?.header?.slots?.leftArea}
          </>
        ),
        rightArea: (
          <>
            <NotificationsDrawer data={_notifications} />
            <ContactsPopover data={_contacts} />
            <SettingsButton />
            {/* 로그인/로그아웃 토글 버튼 */}
            <AuthToggleButton />
            <AccountDrawer data={_account} />
          </>
        ),
      }}
    />
  );

  const renderSidebar = () => (
    <NavVertical
      data={navData}
      isNavMini={isNavMini}
      layoutQuery={layoutQuery}
      cssVars={navVars.section}
      checkPermissions={canDisplayItemByRole}
      onToggleNav={() =>
        settings.setField(
          'navLayout',
          settings.state.navLayout === 'vertical' ? 'mini' : 'vertical'
        )
      }
    />
  );

  const renderFooter = () => null;

  const renderMain = () => (
    <MainSection 
      {...slotProps?.main}
      sx={{
        ...slotProps?.main?.sx,
        pb: { xs: isMobile ? 8 : 0, [layoutQuery]: 0 },
      }}
    >
      {children}
    </MainSection>
  );

  const renderMobileBottomNav = () => {
    if (!isMobile) return null;

    const bottomNavItems = [
      { label: '홈', value: '/', icon: 'solar:home-bold' },
      { label: '채용공고', value: '/jobs', icon: 'solar:case-round-bold' },
      { label: '프로필', value: '/profile', icon: 'solar:user-bold' },
    ];

    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          borderTop: 1,
          borderColor: 'divider',
        }}
        elevation={3}
      >
        <BottomNavigation
          value={pathname.startsWith('/jobs') ? '/jobs' : pathname}
          onChange={(event, newValue) => {
            router.push(newValue);
          }}
          showLabels
          sx={{
            height: 64,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 'auto',
              padding: '6px 0',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              marginTop: '4px',
              '&.Mui-selected': {
                fontSize: '0.75rem',
              },
            },
          }}
        >
          {bottomNavItems.map((item) => (
            <BottomNavigationAction
              key={item.value}
              label={item.label}
              value={item.value}
              icon={<Iconify icon={item.icon} width={24} />}
            />
          ))}
        </BottomNavigation>
      </Paper>
    );
  };

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={!isMobile || isTablet ? renderSidebar() : null}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...navVars.layout, ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
      {renderMobileBottomNav()}
    </LayoutSection>
  );
}

// ----------------------------------------------------------------------

function AuthToggleButton() {
  const router = useRouter();
  const { isAuthenticated, signOut, loadUser } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    // Ensure auth state reflects Supabase session on mount
    loadUser().catch(() => {});
  }, [loadUser]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <Tooltip title="로그인">
        <IconButton color="primary" size="small" onClick={() => router.push('/login')} sx={{ ml: 0.5 }}>
          <LoginRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="로그아웃">
      <IconButton color="inherit" size="small" onClick={handleLogout} sx={{ ml: 0.5 }}>
        <LogoutRoundedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
