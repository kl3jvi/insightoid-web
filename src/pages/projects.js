import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ProjectCard } from 'src/sections/companies/project-card';
import { ProjectsSearch } from 'src/sections/companies/projects-search';
import { useProjectContext } from '../contexts/project-context';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Page = () => {
  const { projects, selectProject, selectedProject, addProject } = useProjectContext();
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreate = async () => {
    const response = await fetch('https://insightoid-backend.fly.dev/api/projects/createProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({ projectName: projectName })
    });

    if (response.ok) {
      const newProject = await response.json();
      console.log(newProject);
      addProject(newProject.data);
    }

    handleClose();
  };

  return (
    <>
      <Head>
        <title>
          Projects | Insightoid
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Projects
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Create Project
                </Button>

                <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: '50%', // Set the width of the modal to 50% of the screen width
                    maxWidth: '500px' // Set the maximum width of the modal to 500px
                  }}>
                    <Typography variant="h6" component="h2">
                      New Project
                    </Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Project Name"
                      type="text"
                      fullWidth
                      variant="filled"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCreate}>
                        Create
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </div>
            </Stack>
            <ProjectsSearch/>
            <Grid
              container
              spacing={3}
            >
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    key={project.projectId}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => {
                        selectProject(project);
                        router.push(`/?projectId=${project.projectId}`);
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6">
                  No projects found.
                </Typography>
              )}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
