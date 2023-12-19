import { useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material';

export const SettingsNotifications = () => {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Stack spacing={6}>
            <Stack spacing={1}>
              <Typography variant="h6">
                Notifications
              </Typography>
              <Stack>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Push Notifications"
                />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};