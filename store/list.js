// Action Types
const SET_LISTS = 'lists/SET_LISTS';
const FETCH_LIST = 'lists/FETCH_LIST';
const UPDATE_LIST_ITEM_CHECKED_STATUS = 'lists/UPDATE_LIST_ITEM_CHECKED_STATUS';
const CREATE_LIST = 'lists/CREATE_LIST';
const DELETE_LIST = 'lists/DELETE_LIST';


// Thunks
export const fetchLists = () => async dispatch => {
  try {
    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/lists');
    if (response.ok) {
      const lists = await response.json();
      dispatch({ type: SET_LISTS, lists });
    }
  } catch (error) {
    console.error('An error occurred while fetching the lists:', error);
  }
};

export const fetchList = (listId) => async (dispatch) => {
  try {
    const response = await fetch(`https://famcart-webservice-dgpp.onrender.com/lists/${listId}`);
    if (response.ok) {
      const listWithItems = await response.json();
      dispatch({
        type: FETCH_LIST,
        list: listWithItems,
      });
    }
  } catch (error) {
    console.error('Error fetching list:', error);
  }
};

export const createList = (listName, userId) => async (dispatch) => {
  try {
    const listData = { list: { name: listName, user_id: userId } };

    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listData),
    });

    if (response.ok) {
      const newList = await response.json();
      dispatch({
        type: CREATE_LIST,
        newList,
      });
    } else {
      const errorResponse = await response.json();
      console.error('Failed to create a new list, server response:', errorResponse);
    }
  } catch (error) {
    console.error('Error creating a new list:', error);
  }
};

export const updateListItemCheckedStatus = (listId, itemId, checked) => async (dispatch) => {
  try {
    const response = await fetch(`https://famcart-webservice-dgpp.onrender.com/lists/${listId}/list_items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked }),
    });

    if (response.ok) {
      const updatedItem = await response.json();
      dispatch({
        type: UPDATE_LIST_ITEM_CHECKED_STATUS,
        listId,
        updatedItem,
      });
    } else {
      console.error('Failed to update checked status');
    }
  } catch (error) {
    console.error('Error updating checked status:', error);
  }
};

export const deleteList = (listId) => async (dispatch) => {
  try {
    const response = await fetch(`https://famcart-webservice-dgpp.onrender.com/lists/${listId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch({
        type: DELETE_LIST,
        listId,
      });
    } else {
      console.error('Failed to delete the list');
    }
  } catch (error) {
    console.error('Error deleting list:', error);
  }
};



// Initial state
const initialState = {
  currentList: null,
  all: [],
};

// Reducer
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'lists/FETCH_LIST':
      return {
        ...state,
        currentList: {
          ...action.list, // Include the list's properties
          items: action.list.list_items, // Include the associated items
        },
      };
    case 'lists/SET_LISTS':
      return {
        ...state,
        all: action.lists,
      };

    case UPDATE_LIST_ITEM_CHECKED_STATUS:
      return {
        ...state,
        currentList: {
          ...state.currentList,
          list_items: state.currentList.list_items.map(item => {
            if (item.id === action.updatedItem.id) {
              return action.updatedItem;
            }
            return item;
          }),
        },
      };
    case CREATE_LIST:
      return {
        ...state,
        all: [...state.all, action.newList], // Add the new list to the list of all lists
      };
    case DELETE_LIST:
      return {
        ...state,
        all: state.all.filter(list => list.id !== action.listId), // Remove the deleted list
      };
    default:
      return state;
  }
};

  
  export default listsReducer;
  

