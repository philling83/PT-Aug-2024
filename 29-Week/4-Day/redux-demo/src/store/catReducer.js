import cats from '../data/data.json'

// Action
const LOAD_CATS = 'cat/loadCats';

// Action Creator
export const loadCats = () => {
  return {
    type: LOAD_CATS,
    cats
  };
};

const initialState = { entries: [] };

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATS:
      return { ...state, entries: [...action.cats] };
    default:
      return state;
  }
};

export default catReducer;