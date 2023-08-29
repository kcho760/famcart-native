import AsyncStorage from '@react-native-async-storage/async-storage';

// Action Types
const SET_USER = 'auth/SET_USER';
const SIGN_UP_USER = 'auth/SIGN_UP_USER';
const LOGOUT_USER = 'auth/LOGOUT_USER';

// Thunks
export const signUpUser = (user) => async (dispatch) => {
  try {
    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      dispatch({
        type: SIGN_UP_USER,
        user: newUser,
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

    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/auth/sign_in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // formData contains email and password only
    });


    if (response.ok) {
      const responseText = await response.text(); // Get the response text

      const userDataResponse = JSON.parse(responseText); // Parse the response text
      const userData = userDataResponse.data;

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('access-token', response.headers.get('access-token'));
      await AsyncStorage.setItem('client', response.headers.get('client'));
      await AsyncStorage.setItem('uid', response.headers.get('uid'));


      dispatch({
        type: SET_USER,
        payload: userData,
      });

      return true;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors);
    }
  } catch (error) {
    console.error('An error occurred:', error); // Log the error
    throw error;
  }
};


export const logoutUser = () => async (dispatch) => {
  const access_token = await AsyncStorage.getItem('access-token');
  const client = await AsyncStorage.getItem('client');
  const uid = await AsyncStorage.getItem('uid');

  try {
    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/auth/sign_out', {
      method: 'DELETE',
      headers: {
        'access-token': access_token,
        'client': client,
        'uid': uid,
      },
    });

    if (response.ok) {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('access-token');
      await AsyncStorage.removeItem('client');
      await AsyncStorage.removeItem('uid');
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
