import React from 'react';
import { useStore } from 'effector-react';
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import {
  Box,
  Drawer,
  SvgIcon,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  Tooltip,
  Typography,
} from 'shared/ui/kit';
import {
  LogoutRoundedIcon,
  PersonOutlineOutlinedIcon,
  PersonRoundedIcon,
  SettingsRoundedIcon,
} from 'shared/ui/icons';
import { PAGES, PATHS } from 'shared/config';
import LogoImg from 'shared/assets/images/logo_w.png';

import { sessionModel, User } from 'entities/session';

import { LoginButton } from 'features/session/login';
import { RegistrationButton } from 'features/session/registration';

import * as model from '../model';

export const Sidebar = () => {
  const opened = useStore(model.$opened);
  const user = useStore(sessionModel.$user);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    model.closeRequested();
  };

  return (
    <Drawer
      anchor="right"
      open={opened}
      onClose={() => model.closeRequested()}
      sx={{ display: { xs: 'flex', md: 'none' } }}
    >
      <Box
        sx={{ width: '100vw', height: '100%', backgroundColor: '#44A5DC' }}
        role="presentation"
        onKeyDown={() => model.closeRequested()}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: '16px',
            }}
          >
            <Box component={Link} to={'/'}>
              <Box
                sx={{
                  display: 'inline-block',
                  width: 150,
                }}
                component="img"
                alt="Logo"
                src={LogoImg}
              />
            </Box>
            <Box onClick={() => model.closeRequested()}>
              <SvgIcon viewBox="0 0 27 27">
                <path
                  d="M14.7521 13.5182L26.7639 1.50642C26.9189 1.34127 27.0035 1.12232 26.9999 0.895899C26.9963 0.669474 26.9047 0.453327 26.7446 0.2932C26.5845 0.133074 26.3684 0.0415286 26.142 0.0379187C25.9156 0.0343088 25.6967 0.118923 25.5315 0.273864L13.5196 12.2856L1.50773 0.275374C1.42779 0.190156 1.33155 0.12187 1.22471 0.0745848C1.11786 0.0272994 1.0026 0.00197356 0.885781 0.000110829C0.768958 -0.0017519 0.652943 0.0198828 0.544646 0.0637379C0.436349 0.107593 0.337981 0.172785 0.255364 0.255411C0.172747 0.338037 0.107563 0.436416 0.0637124 0.544725C0.0198622 0.653035 -0.00175162 0.769062 0.000110901 0.885899C0.00197342 1.00274 0.0272964 1.11801 0.0745766 1.22486C0.121857 1.33172 0.190116 1.42798 0.275325 1.50793L12.2872 13.5197L0.270795 25.5314C0.115872 25.6966 0.0312668 25.9155 0.0348763 26.1419C0.0384858 26.3684 0.130021 26.5845 0.290129 26.7446C0.450238 26.9047 0.666343 26.9963 0.892742 26.9999C1.11914 27.0035 1.33807 26.9189 1.5032 26.7639L13.5151 14.7507L25.527 26.7639C25.6921 26.9189 25.9111 27.0035 26.1375 26.9999C26.3639 26.9963 26.58 26.9047 26.7401 26.7446C26.9002 26.5845 26.9917 26.3684 26.9954 26.1419C26.999 25.9155 26.9144 25.6966 26.7594 25.5314L14.7521 13.5182Z"
                  fill="white"
                />
              </SvgIcon>
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Button
              component={HashLink}
              to={PAGES[0].root}
              smooth
              variant="text"
              color="secondary"
              onClick={() => model.closeRequested()}
              sx={{
                pl: 0,
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                '&.active': {
                  backgroundColor: 'rgba(51, 51, 51, 0.14)',
                  borderRadius: 0,
                },
                '&::before': {
                  content: '""',
                  background: '#FFFFFF center center no-repeat',
                  width: 36,
                  height: '1px',
                  ml: '-24px',
                  mr: '36px',
                },
              }}
            >
              {PAGES[0].name}
            </Button>
            <Button
              component={HashLink}
              to={PAGES[1].root}
              smooth
              variant="text"
              color="secondary"
              onClick={() => model.closeRequested()}
              sx={{
                pl: 0,
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                '&.active': {
                  backgroundColor: 'rgba(51, 51, 51, 0.14)',
                  borderRadius: 0,
                },
                '&::before': {
                  content: '""',
                  background: '#FFFFFF center center no-repeat',
                  width: 36,
                  height: '1px',
                  ml: '-24px',
                  mr: '36px',
                },
              }}
            >
              {PAGES[1].name}
            </Button>
            <Button
              component={NavLink}
              to={PAGES[2].root}
              variant="text"
              color="secondary"
              onClick={() => model.closeRequested()}
              sx={{
                pl: 0,
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                '&.active': {
                  backgroundColor: 'rgba(51, 51, 51, 0.14)',
                  borderRadius: 0,
                },
                '&::before': {
                  content: '""',
                  background: '#FFFFFF center center no-repeat',
                  width: 36,
                  height: '1px',
                  ml: '-24px',
                  mr: '36px',
                },
              }}
            >
              {PAGES[2].name}
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            {user ? (
              <>
                <Button
                  component={Link}
                  to={PATHS.office.profile.courses}
                  sx={{
                    m: 0,
                    display: 'inline-block',
                  }}
                  variant="contained"
                  color="secondary"
                  onClick={() => model.closeRequested()}
                >
                  Мої курси
                </Button>
                <Tooltip title="Open profile">
                  <IconButton
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
                        component={Link}
                        to={PATHS.office.profile.courses}
                        onClick={handleCloseUserMenu}
                        sx={{ borderBottom: '3px solid #FFFFFF' }}
                      >
                        <ListItemIcon>
                          <PersonRoundedIcon color="secondary" />
                        </ListItemIcon>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                        >
                          Мої курси
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={PATHS.office.profile.settings.info}
                        onClick={handleCloseUserMenu}
                        sx={{ borderBottom: '3px solid #FFFFFF' }}
                      >
                        <ListItemIcon>
                          <SettingsRoundedIcon color="secondary" />
                        </ListItemIcon>
                        <Typography
                          variant="h6"
                          color="secondary"
                          sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
                        >
                          Налаштування
                        </Typography>
                      </ListItemButton>
                    </ListItem>
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
                          Вихід
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Menu>
              </>
            ) : (
              <>
                <RegistrationButton variant={false} onClick={() => model.closeRequested()} />
                <LoginButton onClick={() => model.closeRequested()} />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
};
