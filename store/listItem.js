export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';

export const addListItem = (listItem) => {
  return async (dispatch) => {
    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/list_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_item: {
          ...listItem, // Keep the existing properties of listItem
          list_id: listItem.list_id, // Add list_id property to the payload
        },
      }),
      
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: ADD_LIST_ITEM,
        payload: data,
      });
      return data;
    }
  };
};

const initialState = {
    listItems: [],
    };

export const listItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_LIST_ITEM:
        return {
          ...state,
          listItems: [...state.listItems, action.payload],
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  