import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 90 90"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="5" width="80" height="80" rx="8" fill="#15B79E"/>
      <path d="M54.8142 67.6944C47.7207 60.601 49.2141 55.1875 51.6408 46.974C54.2542 38.0138 57.7076 25.7869 44.9207 13L35.4005 22.5202C42.494 29.6137 41.0006 35.0271 38.5739 43.2406C35.9605 52.2008 32.507 64.4277 45.2939 77.2147L54.8142 67.6944Z" fill="white"/>
  </svg>
  );
};


