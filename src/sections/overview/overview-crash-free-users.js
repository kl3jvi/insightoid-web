import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';


const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewCrashFreeUsers = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();
  const [selectedDays, setSelectedDays] = useState(28); // default value is 28

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Select
            onChange={(event) => setSelectedDays(event.target.value)}
            sx={{
              '& .MuiSelect-select': {
                py: 0.5,
                pr: 1.5,
                pl: 1.5
              },
              '& .MuiSvgIcon-root': {
                ml: 0.5
              }
            }}
            value={selectedDays}
            variant="outlined"
          >
            <MenuItem value={7}>
              Last 7 days
            </MenuItem>
            <MenuItem value={14}>
              Last 14 days
            </MenuItem>
            <MenuItem value={21}>
              Last 21 days
            </MenuItem>
            <MenuItem value={28}>
              Last 28 days
            </MenuItem>
          </Select>
        )}
        title="Crash Free Users"
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
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
        >
          Overview
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewCrashFreeUsers.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
