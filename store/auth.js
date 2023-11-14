import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
const SET_USER = 'auth/SET_USER';
const SIGN_UP_USER = 'auth/SIGN_UP_USER';
const LOGOUT_USER = 'auth/LOGOUT_USER';

// Thunks
export const signUpUser = (user) => async (dispatch) => {
  try {
    const response = await fetch('https://famcart-webservice.onrender.com/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      console.log("New User Data:", newUser);
      
      dispatch({
        type: SIGN_UP_USER,
        payload: newUser,
      });      
      return newUser;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw error;
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await fetch('https://famcart-webservice.onrender.com/auth/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const responseText = await response.text(); // Get the response text for potential JSON parsing

    // Attempt to parse the response text as JSON
    let userDataResponse;
    try {
      userDataResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText);
      console.error('Parse Error:', parseError);
      // Include status in the error for better debugging
      throw new Error(`Failed to parse response as JSON. Status: ${response.status}. Error: ${parseError.message}`);
    }

    if (response.ok) {
      const headers = response.headers;
      const userData = userDataResponse.data;

      // Store tokens and user info in AsyncStorage
      await AsyncStorage.setItem('access-token', headers.get('access-token'));
      await AsyncStorage.setItem('client', headers.get('client'));
      await AsyncStorage.setItem('uid', headers.get('uid'));
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      dispatch({
        type: SET_USER,
        payload: userData,
      });

      return true;
    } else {
      // Log the non-OK response for debugging
      console.error('Non-OK HTTP Response:', response.status, responseText);
      throw new Error(userDataResponse.errors ? userDataResponse.errors.join(', ') : 'Error during login.');
    }
  } catch (error) {
    console.error('Login error:', error); // This will log the error object with all its properties
    Alert.alert('Login Error', `Type: ${error.name}\nMessage: ${error.message}`);
    throw error; // Re-throw the error for possible further handling
  }  
};


export const logoutUser = () => async (dispatch) => {
  const access_token = await AsyncStorage.getItem('access-token');
  const client = await AsyncStorage.getItem('client');
  const uid = await AsyncStorage.getItem('uid');

  try {
    const response = await fetch('https://famcart-webservice.onrender.com/auth/sign_out', {
      method: 'DELETE',
      headers: {
        'access-token': access_token,
        'client': client,
        'uid': uid,
      },
    });

    if (response.ok) {
      await AsyncStorage.removeItem('user');
      dispatch({
        type: LOGOUT_USER,
      });
      return true;
    } else {
      const errorData = await response.json();
      console.error('Logout Error:', errorData.errors);
    }
  } catch (error) {
    console.error('An error occurred during logoutUser:', error);
  }
};

export const loadUserFromLocalStorage = () => {
  return async (dispatch) => {
    const userString = await AsyncStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && typeof user === 'object') {
      dispatch({
        type: 'auth/SET_USER',
        payload: user,
      });
    } else {
      console.error("User data in local storage is in incorrect format:", userString);
    }
  };
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

// Initial State
const initialState = {
  user: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      console.log("Setting new user with payload:", action.payload);
      return {
        ...state,
        user: action.payload,
      };
    
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
