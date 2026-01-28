import React, { ReactNode, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Mode } from 'components/App';
import { useTranslation } from 'react-i18next';
import { useHomeLayout } from 'contexts/HomeLayoutContext';
import Typography from '@mui/material/Typography';

interface NavbarProps {
  mode: Mode;
  onChangeMode: () => void;
}
const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' }
];

const Navbar: React.FC<NavbarProps> = ({
  mode,
  onChangeMode: onChangeMode
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { layoutType, toggleLayout } = useHomeLayout();
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  const navItems: { label: string; path: string }[] = [
    // { label: 'Features', path: '/features' }
    // { label: 'About Us', path: '/about-us' }
  ];

  const languageSelector = (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        displayEmpty
        sx={{
          color: 'inherit',
          '& .MuiSelect-icon': {
            color: 'inherit'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const buttons: ReactNode[] = [
    languageSelector,
    <IconButton
      key="layout-toggle"
      onClick={toggleLayout}
      sx={{ color: 'inherit' }}
      title={layoutType === 'compact' ? 'Text list view' : 'Grid view'}
    >
      <Icon
        fontSize={28}
        icon={
          layoutType === 'compact'
            ? 'material-symbols:format-list-bulleted'
            : 'material-symbols:grid-view-rounded'
        }
      />
    </IconButton>,
    <Icon
      key={mode}
      onClick={onChangeMode}
      style={{ cursor: 'pointer' }}
      fontSize={30}
      icon={
        mode === 'dark'
          ? 'ic:round-dark-mode'
          : mode === 'light'
            ? 'ic:round-light-mode'
            : 'ic:round-contrast'
      }
    />
  ];
  const drawerList = (
    <List>
      {navItems.map((navItem) => (
        <ListItemButton
          key={navItem.path}
          onClick={() => navigate(navItem.path)}
        >
          <ListItemText primary={navItem.label} />
        </ListItemButton>
      ))}
      {buttons.map((button, index) => (
        <ListItem key={`drawer-button-${index}`}>{button}</ListItem>
      ))}
    </List>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        color: 'text.primary',
        pt: 2
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: { md: '50px', lg: '150px' }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            fontSize: isMobile ? '1.5rem' : '2rem'
          }}
        >
          Omnitools
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Stack direction={'row'} spacing={3} alignItems={'center'}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                sx={{
                  '&:hover': {
                    color: theme.palette.primary.main,
                    transition: 'color 0.3s ease',
                    backgroundColor: 'white'
                  }
                }}
              >
                <Link
                  to={item.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
            {buttons}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
