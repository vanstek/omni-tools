import {
  Autocomplete,
  Box,
  darken,
  lighten,
  Stack,
  styled,
  TextField,
  useTheme
} from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { DefinedTool } from '@tools/defineTool';
import { filterTools, tools } from '@tools/index';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getToolCategoryTitle } from '@utils/string';
import { useTranslation } from 'react-i18next';
import { validNamespaces } from '../i18n';
import {
  getBookmarkedToolPaths,
  isBookmarked,
  toggleBookmarked
} from '@utils/bookmark';
import IconButton from '@mui/material/IconButton';
import { useUserTypeFilter } from '../providers/UserTypeFilterProvider';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8)
  })
}));

const GroupItems = styled('ul')({
  padding: 0
});

export default function Hero() {
  const { t } = useTranslation(validNamespaces);
  const [inputValue, setInputValue] = useState<string>('');
  const theme = useTheme();
  const { selectedUserTypes } = useUserTypeFilter();
  const [filteredTools, setFilteredTools] = useState<DefinedTool[]>(tools);
  const [bookmarkedToolPaths, setBookmarkedToolPaths] = useState<string[]>(
    getBookmarkedToolPaths()
  );
  const navigate = useNavigate();

  const handleInputChange = (
    _event: React.ChangeEvent<{}>,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    setFilteredTools(filterTools(tools, newInputValue, selectedUserTypes, t));
  };

  return (
    <Box width={{ xs: '90%', md: '80%', lg: '60%' }}>
      <Autocomplete
        sx={{ mb: 2 }}
        autoHighlight
        options={filteredTools}
        groupBy={(option) => option.type}
        renderGroup={(params) => {
          return (
            <li key={params.key}>
              <GroupHeader>{getToolCategoryTitle(params.group, t)}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          );
        }}
        inputValue={inputValue}
        getOptionLabel={(option) => t(option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder={t('translation:hero.searchPlaceholder')}
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchIcon />,
              sx: {
                borderRadius: 4,
                backgroundColor: 'background.paper'
              }
            }}
            onChange={(event) => handleInputChange(event, event.target.value)}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            onClick={() => navigate('/' + option.path)}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Icon fontSize={20} icon={option.icon} />
                <Box>
                  <Typography fontWeight={'bold'}>{t(option.name)}</Typography>
                  <Typography fontSize={12}>
                    {t(option.shortDescription)}
                  </Typography>
                </Box>
              </Stack>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmarked(option.path);
                  setBookmarkedToolPaths(getBookmarkedToolPaths());
                }}
              >
                <Icon
                  fontSize={20}
                  color={
                    isBookmarked(option.path)
                      ? theme.palette.primary.main
                      : theme.palette.grey[500]
                  }
                  icon={
                    isBookmarked(option.path)
                      ? 'mdi:bookmark'
                      : 'mdi:bookmark-plus-outline'
                  }
                />
              </IconButton>
            </Stack>
          </Box>
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            navigate('/' + newValue.path);
          }
        }}
      />
    </Box>
  );
}
