// import articles from '../data/data.json';

// Actions
const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

// Action creators - returns objects
export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

// Thunk Action Creators - return function
export const fetchArticles = () => async (dispatch) => {
  // 1. Fetch request to grab data from backend
  const response = await fetch('/api/articles');
  const articles = await response.json();

  // 2. Update the Redux store
  dispatch(loadArticles(articles));
};

export const writeArticle = (payload) => async (dispatch) => {
  // 1. POST request to our backend
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  // 2. Update the Redux with new article
  if (response.ok) {
    const article = await response.json();
    dispatch(addArticle(article));

    return article;
  }
}

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;
