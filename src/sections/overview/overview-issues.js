import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  resolved: 'success',
  regressed: 'error',
  unresolved: 'warning'
};
export const OverviewIssues = (props) => {
  const { issues = [], sx } = props;
  return (
    <Card sx={sx}>
      <CardHeader title="Issue Overview"/>
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Thread Name
                </TableCell>
                <TableCell>
                  Exception Name
                </TableCell>
                <TableCell>
                  Exception Message
                </TableCell>
                <TableCell>
                  Time Stamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => {
                const timeStamp = format(new Date(issue?.timeStamp ?? 1), 'dd MMM yyyy HH:mm');

                return (
                  <TableRow
                    hover
                    key={issue.threadId}
                  >
                    <TableCell>
                      {issue.threadName}
                    </TableCell>
                    <TableCell>
                      {issue.exceptionName}
                    </TableCell>
                    <TableCell>
                      {issue.exceptionMessage}
                    </TableCell>
                    <TableCell>
                      {timeStamp}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider/>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon/>
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewIssues.prototype = {
  issues: PropTypes.array,
  sx: PropTypes.object
};