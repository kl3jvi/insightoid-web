import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const generatePayload = (userData) => {
  console.log({
    id: userData?.userId,
    avatar: `https://ui-avatars.com/api/?format=svg&background=random&name=${userData.username}`,
    username: userData.username,
    email: userData.email
  });

  return {
    id: userData?.userId,
    avatar: `https://ui-avatars.com/api/?format=svg&background=random&name=${userData.username}`,
    username: userData.username,
    email: userData.email
  };
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = Cookies.get('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // Fetch the user data from your server
      const res = await fetch('https://insightoid-backend.fly.dev/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}` // Use the token from cookies
        }
      });

      if (!res.ok) {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
        return;
      }

      const authenticationData = await res.json();

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: generatePayload(authenticationData.data) // Set the payload to the user data returned from the server
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    const res = await fetch('https://insightoid-backend.fly.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      throw new Error('Failed to log in');
    }

    let authData;
    try {
      authData = await res.json();
    } catch (err) {
      console.error('Failed to parse JSON response', err);
      return;
    }

    Cookies.set('authenticated', 'true');
    Cookies.set('token', authData.authToken); // Save the token in cookies
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: generatePayload(authData.data)
    });
  };

  const signUp = async (email, username, password) => {
    const res = await fetch(`https://insightoid-backend.fly.dev/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    });

    if (!res.ok) {
      // check the error code and respond based on that
      if (res.status === 409) {
        throw new Error('User already exists');
      } else if (res.status === 400) {
        throw new Error('Invalid email');
      } else {
        throw new Error('Failed to sign up');
      }
    }

    let authData;
    try {
      authData = await res.json();
    } catch (err) {
      console.error('Failed to parse JSON response', err);
      return;
    }

    Cookies.set('authenticated', 'true');
    Cookies.set('token', authData.authToken); // Save the token in cookies

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: generatePayload(authData.data)
    });
  };
  const signOut = () => {
    Cookies.remove('authenticated');
    Cookies.remove('token');

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
