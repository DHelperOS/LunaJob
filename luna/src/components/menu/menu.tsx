'use client';

import { forwardRef } from 'react';
import MuiMenu, { MenuProps } from '@mui/material/Menu';
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MuiMenuList, { MenuListProps } from '@mui/material/MenuList';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: theme.customShadows.dropdown,
    borderRadius: theme.shape.borderRadius,
  },
}));

// ----------------------------------------------------------------------

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => <StyledMenu ref={ref} {...props} />
);

Menu.displayName = 'Menu';

// ----------------------------------------------------------------------

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => <MuiMenuItem ref={ref} {...props} />
);

MenuItem.displayName = 'MenuItem';

// ----------------------------------------------------------------------

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>(
  (props, ref) => <MuiMenuList ref={ref} {...props} />
);

MenuList.displayName = 'MenuList';