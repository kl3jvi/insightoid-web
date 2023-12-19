import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import Cookies from 'js-cookie';

const ProjectContext = createContext();

const initialState = {
  projects: [],
  selectedProject: typeof window !== 'undefined' && window.localStorage.getItem('selectedProject')
    ? JSON.parse(window.localStorage.getItem('selectedProject'))
    : null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: action.payload };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    default:
      return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    // Fetch the list of projects from the API
    const res = await fetch('https://insightoid-backend.fly.dev/api/projects/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}` // Use the token from cookies
      }
    });

    if (!res.ok) {
      dispatch({
        type: 'SET_PROJECTS',
        payload: [] // Set the payload to the list of projects returned from the server
      });

    }
    try {
      const result = await res.json();
      dispatch({
        type: 'SET_PROJECTS',
        payload: result.data
      });
    } catch (e) {
      dispatch({
        type: 'SET_PROJECTS',
        payload: []
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (state.selectedProject) {
      localStorage.setItem('selectedProject', JSON.stringify(state.selectedProject));
    }
  }, [state.selectedProject]);

  const selectProject = (project) => {
    dispatch({
      type: 'SELECT_PROJECT',
      payload: project
    });
  };

  const addProject = (project) => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: project
    });

  };

  return (
    <ProjectContext.Provider value={{ ...state, selectProject, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);