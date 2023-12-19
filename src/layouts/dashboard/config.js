import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import GraphIcon from '@heroicons/react/24/solid/ArrowTrendingUpIcon';
import CodeIcon from '@heroicons/react/24/solid/CommandLineIcon';
import BugIcon from '@heroicons/react/24/solid/BugAntIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Issues',
    path: '/issues',
    icon: (
      <SvgIcon fontSize="small">
        <BugIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: (
      <SvgIcon fontSize="small">
        <CodeIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: (
      <SvgIcon fontSize="small">
        <GraphIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon/>
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon/>
      </SvgIcon>
    )
  }
];

