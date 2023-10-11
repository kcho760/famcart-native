// actions
export const CREATE_NEW_ITEM = 'CREATE_NEW_ITEM';
export const DELETE_ITEMS = 'DELETE_ITEMS';

// action creators
export const createNewItem = (item) => {
    return async (dispatch) => {
      const response = await fetch('https://famcart-webservice-dgpp.onrender.com/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item }),
      });
  
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: CREATE_NEW_ITEM,
          payload: data,
        });
  
        return data;
      }
    };
  };

export const deleteItems = (itemIds) => {
  return async (dispatch) => {
    const response = await fetch('https://famcart-webservice-dgpp.onrender.com/items/bulk_delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: itemIds }),
    });    

    if (response.ok) {
      dispatch({
        type: DELETE_ITEMS,
        payload: itemIds,
      });
    } else {
      console.error("Error deleting items:", await response.text());
    }
    
  };
};
  


// reducer
const initialState = {
  items: [],
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => !action.payload.includes(item.id)),
      };
    default:
      return state;
  }
};


