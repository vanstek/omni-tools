import { getToolsByCategory } from '@tools/index';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, Stack, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { categoriesColors } from 'config/uiConfig';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const SingleCompactCategory = function ({
  category,
  index
}: {
  category: ArrayElement<ReturnType<typeof getToolsByCategory>>;
  index: number;
}) {
  const { t } = useTranslation(getI18nNamespaceFromToolCategory(category.type));
  const navigate = useNavigate();
  const theme = useTheme();
  const [hovered, setHovered] = useState<boolean>(false);

  const categoryTitle = t(`categories.${category.type}.title`, category.title);
  const categoryDescription = t(
    `categories.${category.type}.description`,
    category.description
  );

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Card
        onClick={() => navigate('/categories/' + category.type)}
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
        <CardContent sx={{ height: '100%' }}>
          <Stack
            direction={'column'}
            height={'100%'}
            spacing={2}
            alignItems={'center'}
            textAlign={'center'}
          >
            <Icon
              icon={category.icon}
              fontSize={'56px'}
              style={{
                transition: 'transform 0.2s ease-in-out',
                transform: hovered ? 'scale(1.1)' : 'scale(1)'
              }}
              color={categoriesColors[index % categoriesColors.length]}
            />
            <Box>
              <Typography
                fontSize={18}
                fontWeight={700}
                sx={{
                  color: hovered ? 'primary.main' : 'text.primary',
                  transition: 'color 0.2s ease-in-out',
                  mb: 1
                }}
              >
                {categoryTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: '0.875rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '2.5em'
                }}
              >
                {categoryDescription}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default function CategoriesCompact() {
  const { selectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation();
  const categories = getToolsByCategory(selectedUserTypes, t);

  return (
    <Grid width={'90%'} maxWidth={'1400px'} container spacing={2}>
      {categories.map((category, index) => (
        <SingleCompactCategory
          key={category.type}
          category={category}
          index={index}
        />
      ))}
    </Grid>
  );
}
