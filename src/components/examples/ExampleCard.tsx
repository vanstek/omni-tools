import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExampleOptions from './ExampleOptions';
import { GetGroupsType } from '@components/options/ToolOptions';

export interface ExampleCardProps<T> {
  title: string;
  description: string;
  sampleText?: string;
  sampleResult: string;
  sampleOptions: T;
  changeInputResult: (newInput: string | undefined, newOptions: T) => void;
  getGroups: GetGroupsType<T> | null;
}

export default function ExampleCard<T>({
  title,
  description,
  sampleText,
  sampleResult,
  sampleOptions,
  changeInputResult,
  getGroups
}: ExampleCardProps<T>) {
  const theme = useTheme();
  return (
    <Card
      raised
      onClick={() => {
        changeInputResult(sampleText, sampleOptions);
      }}
      sx={{
        bgcolor: 'background.lightSecondary',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'background.hover'
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" borderRadius="5px">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>
        <Stack direction={'column'} alignItems={'center'} spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

          {sampleText && (
            <Box
              sx={{
                display: 'flex',
                zIndex: '2',
                width: '100%',
                height: '100%',
                bgcolor: 'background.default',
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <TextField
                value={sampleText}
                disabled
                fullWidth
                multiline
                sx={{
                  '& .MuiOutlinedInput-root': {
                    zIndex: '-1',
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
              />
            </Box>
          )}

          <ArrowDownwardIcon />
          <Box
            sx={{
              display: 'flex',
              zIndex: '2',
              width: '100%',
              height: '100%',
              bgcolor: 'background.default',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <TextField
              value={sampleResult}
              disabled
              fullWidth
              multiline
              sx={{
                '& .MuiOutlinedInput-root': {
                  zIndex: '-1',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />
          </Box>

          <ExampleOptions options={sampleOptions} getGroups={getGroups} />
        </Stack>
      </CardContent>
    </Card>
  );
}
