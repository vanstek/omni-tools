import { tools } from '@tools/index';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { categoriesColors } from 'config/uiConfig';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import { filterToolsByUserTypes } from '@tools/index';

export default function AllToolsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedUserTypes } = useUserTypeFilter();

  // Filter tools based on selected user types
  const filteredTools =
    selectedUserTypes.length > 0
      ? filterToolsByUserTypes(tools, selectedUserTypes)
      : tools;

  return (
    <Box width={'90%'} maxWidth={'1400px'}>
      <Grid container spacing={2}>
        {filteredTools.map((tool, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tool.path}>
            <ToolCard tool={tool} index={index} t={t} navigate={navigate} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function ToolCard({ tool, index, t, navigate }: any) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('/' + tool.path)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        backgroundColor: hovered ? 'background.hover' : 'background.paper',
        transition: 'all 0.2s ease-in-out',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        border: `1px solid ${
          hovered ? theme.palette.primary.main : 'transparent'
        }`
      }}
    >
      <CardContent>
        <Stack spacing={1.5} alignItems="center" textAlign="center">
          <Icon
            icon={tool.icon ?? 'ph:compass-tool-thin'}
            fontSize={'48px'}
            color={categoriesColors[index % categoriesColors.length]}
            style={{
              transition: 'transform 0.2s ease-in-out',
              transform: hovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              color: hovered ? 'primary.main' : 'text.primary',
              transition: 'color 0.2s ease-in-out',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            {/*@ts-ignore*/}
            {t(tool.name)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '2.5em'
            }}
          >
            {/*@ts-ignore*/}
            {t(tool.shortDescription)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
