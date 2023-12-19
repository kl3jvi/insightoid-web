import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import InfoIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ClipboardCopyIcon from '@heroicons/react/24/outline/ClipboardIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import copy from 'copy-to-clipboard';

export const ProjectCard = (props) => {
  const { project, onClick } = props;
  const handleCopy = () => {
    copy(project.projectId);
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #e0e0e0',
        cursor: 'pointer', // Change the cursor to a pointer
        transition: 'transform 0.3s ease-in-out', // Add a transition for the transform property
        '&:hover': {
          transform: 'scale(1.02)' // Scale the card up slightly when hovered
        }
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src="https://cdn.worldvectorlogo.com/logos/android-4.svg"
            variant="square"
          />
        </Box>
        <Typography
          align="start"
          gutterBottom
          variant="h5"
        >{project.projectName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            align="start"
            variant="body1"
          >
            {project.projectId}
          </Typography>
          <Tooltip
            title="Click to copy the project id."
          >
            <ClipboardCopyIcon style={{ height: '20px', width: '20px', cursor: 'pointer' }} onClick={handleCopy}/>
          </Tooltip>
          <Tooltip
            title="This is the id that you should use as key when initializing the android sdk.">
            <InfoIcon style={{ height: '20px', width: '20px' }}/>
          </Tooltip>
        </Box>
      </CardContent>
      <Box sx={{ flexGrow: 1 }}/>
      <Divider/>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon/>
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon/>
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {project.downloads} Downloads
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
