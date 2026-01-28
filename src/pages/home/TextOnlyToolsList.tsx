import { getToolsByCategory } from '@tools/index';
import {
  Box,
  Typography,
  Link as MuiLink,
  useTheme,
  alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import { Icon } from '@iconify/react';
import { categoriesColors } from 'config/uiConfig';

export default function TextOnlyToolsList() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { selectedUserTypes } = useUserTypeFilter();

  // Get categories with their tools
  const categories = getToolsByCategory(selectedUserTypes, t);

  return (
    <Box width={'90%'} maxWidth={'1400px'}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)'
          },
          gap: 4
        }}
      >
        {categories.map((category, categoryIndex) => (
          <CategorySection
            key={category.type}
            category={category}
            categoryIndex={categoryIndex}
            t={t}
            theme={theme}
          />
        ))}
      </Box>
    </Box>
  );
}

function CategorySection({ category, categoryIndex, t, theme }: any) {
  const [hoveredCategory, setHoveredCategory] = useState(false);

  return (
    <Box>
      {/* Category Header */}
      <MuiLink
        component={Link}
        to={'/categories/' + category.type}
        underline="none"
        onMouseEnter={() => setHoveredCategory(true)}
        onMouseLeave={() => setHoveredCategory(false)}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
            pb: 1,
            borderBottom: `2px solid ${alpha(
              categoriesColors[categoryIndex % categoriesColors.length],
              0.3
            )}`
          }}
        >
          <Icon
            icon={category.icon}
            fontSize={'24px'}
            color={categoriesColors[categoryIndex % categoriesColors.length]}
            style={{
              transition: 'transform 0.2s ease-in-out',
              transform: hoveredCategory ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              color: hoveredCategory
                ? 'primary.main'
                : categoriesColors[categoryIndex % categoriesColors.length],
              transition: 'color 0.2s ease-in-out',
              fontSize: '1rem'
            }}
          >
            {category.rawTitle}
          </Typography>
        </Box>
      </MuiLink>

      {/* Tools List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {category.tools.map((tool: any) => (
          <ToolLink key={tool.path} tool={tool} t={t} theme={theme} />
        ))}
      </Box>
    </Box>
  );
}

function ToolLink({ tool, t, theme }: any) {
  const [hovered, setHovered] = useState(false);

  return (
    <MuiLink
      component={Link}
      to={'/' + tool.path}
      underline="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'block',
        padding: '4px 8px',
        borderRadius: 1,
        transition: 'all 0.2s ease-in-out',
        backgroundColor: hovered
          ? alpha(theme.palette.primary.main, 0.08)
          : 'transparent',
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08)
        }
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: hovered ? 'primary.main' : 'text.primary',
          transition: 'color 0.2s ease-in-out',
          fontSize: '0.875rem',
          fontWeight: hovered ? 500 : 400
        }}
      >
        {/*@ts-ignore*/}
        {t(tool.name)}
      </Typography>
    </MuiLink>
  );
}
