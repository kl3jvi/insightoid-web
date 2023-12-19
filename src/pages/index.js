import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewCrashReports } from 'src/sections/overview/overview-crash-reports';
import { OverviewIssues } from 'src/sections/overview/overview-issues';
import { OverviewCrashFreeUsers } from 'src/sections/overview/overview-crash-free-users';
import { OverviewUserEngagement } from 'src/sections/overview/overview-user-engagement';
import { OverviewTotalUsers } from 'src/sections/overview/overview-total-users';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useProjectContext } from '../contexts/project-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const { selectedProject } = useProjectContext();
  const router = useRouter();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    router.replace(`/?projectId=${selectedProject?.projectId}`);
  }, [selectedProject]);

  useEffect(() => {
    const projectId = selectedProject?.projectId;
    fetch(`https://insightoid-backend.fly.dev/api/crash-reports/project/${projectId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(response =>
      setIssues(response.data.crashes)
    ).catch(error => console.error('Error:', error));
  }, [selectedProject]);

  return (
    <>
      <Head>
        <title>
          Dashboard | Insightoid
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewCrashReports
                difference={12}
                positive
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
                value="2340"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalUsers
                difference={16}
                positive={false}
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
                value="1.6k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewUserEngagement
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
                value={75.5}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewCrashFreeUsers
                chartSeries={[
                  {
                    name: '30 days',
                    data: [18, 16, 5, 8]
                  }
                ]}
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewTraffic
                chartSeries={[63, 37]}
                labels={['Tablet', 'Phone']}
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
            >
              <OverviewIssues
                issues={issues}
                sx={{
                  height: '100%',
                  border: '1px solid #e0e0e0'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>);
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
