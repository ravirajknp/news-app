import React, { createContext, useReducer } from "react";
import {
  SET_ADVANCE_SEARCH,
  SET_FILTERS,
  SET_FILTERS_VALUE,
  SET_NEWS,
  SET_SEARCH,
  SET_SELECTED_NEWS,
} from "./action";

export const Context = createContext();

const initialState = {
  searchCriteria: {
    query: "",
    start_date: "",
    end_date: "",
    sentiment: "",
    source: [],
    category: [],
  },
  advanceSearch: [
    {
      isActive: false,
      name: "sentiment",
      label: "Sentiment",
      options: [
        {
          name: "-",
          id: "",
        },
        {
          name: "Positive",
          id: "positive",
        },
        {
          name: "Negative",
          id: "negative",
        },
        {
          name: "Neutral",
          id: "neutral",
        },
      ],
    },
    {
      isActive: false,
      name: "category",
      label: "Category",
      options: [],
    },
    {
      isActive: false,
      name: "source",
      label: "Source",
      options: [],
    },
  ],
  filters: [],

  news: [],
  selectedNews: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        searchCriteria: {
            ...state.searchCriteria,
            ...action.payload
        }
      };
      
    case SET_ADVANCE_SEARCH:
      const updatedData = state.advanceSearch.map((search) => {
        if (search.name === action.payload.name) {
          return {
            ...search,
            options: action.payload.data,
          };
        }
        return search;
      });
      return {
        ...state,
        advanceSearch: updatedData,
      };
    case SET_FILTERS:
      const filters = state.filters;
      filters[action.payload] = {};
      return {
        ...state,
        filters: filters,
      };
    case SET_FILTERS_VALUE: {
      const item = state.advanceSearch.find(
        (item) => item.name === action.payload.value
      );
      const filters = state.filters;
      filters[action.payload.index] = item;
      return {
        ...state,
      };
    }
    case SET_NEWS: {
      return {
        ...state,
        news: action.payload,
        selectedNews: action.payload?.[0]
      };
    }
    case SET_SELECTED_NEWS:
      return {
        ...state,
        selectedNews: action.payload
      }

    default: {
      return state;
    }
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
