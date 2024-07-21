import React from 'react';
import {
  ChevronLeftIcon,
  LogoutRoundedIcon,
  MenuIcon,
  PersonOutlineOutlinedIcon,
} from 'shared/ui/icons';
import {
  CSSObject,
  Drawer as MuiDrawer,
  IconButton,
  Theme,
  styled,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Tooltip,
} from 'shared/ui/kit';
import { ITEMS } from './config';
import { useStore } from 'effector-react';
import { sessionModel } from 'entities/session';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const user = useStore(sessionModel.$user);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {user && open && (
          <>
            <Tooltip title="Open profile">
              <IconButton
                color="inherit"
                onClick={handleOpenUserMenu}
                sx={{
                  width: 42,
                  height: 42,
                }}
              >
                <PersonOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '45px',
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  py: '17px',
                  px: '25px',
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      sessionModel.logoutRequested();
                      handleCloseUserMenu();
                    }}
                    sx={{ borderBottom: '3px solid #FFFFFF' }}
                  >
                    <ListItemIcon>
                      <LogoutRoundedIcon color="secondary" />
                    </ListItemIcon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                    >
                      Logout
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            </Menu>
          </>
        )}
        <IconButton
          color="inherit"
          onClick={handleDrawerClose}
          sx={{
            ...(!open && { display: 'none' }),
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {ITEMS.filter((item) => !item.perms || item.perms.includes(user?.role ?? '')).map(
          (page) => (
            <ListItem
              key={page.path}
              disablePadding
              sx={{
                display: 'block',
                color: '#FFFFFF',
                '&.active': {
                  backgroundColor: 'rgba(51, 51, 51, 0.14)',
                },
              }}
              component={NavLink}
              to={page.path}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  );
};
