import { Box, useTheme } from '@mui/material';
import Hero from 'components/Hero';
import CategoriesCompact from './CategoriesCompact';
import TextOnlyToolsList from './TextOnlyToolsList';
import { Helmet } from 'react-helmet';
import { useHomeLayout } from 'contexts/HomeLayoutContext';

export default function Home() {
  const theme = useTheme();
  const { layoutType } = useHomeLayout();

  return (
    <Box
      padding={{
        xs: 1,
        md: 3,
        lg: 5
      }}
      sx={{
        backgroundColor: 'background.default'
      }}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
    >
      <Helmet title={'OmniTools'} />
      <Hero />
      {layoutType === 'compact' && <CategoriesCompact />}
      {layoutType === 'textList' && <TextOnlyToolsList />}
    </Box>
  );
}
