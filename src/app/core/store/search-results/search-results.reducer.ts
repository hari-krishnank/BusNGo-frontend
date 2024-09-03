import { createReducer, on } from "@ngrx/store";
import * as  SearchResultsActions from './search-results.actions';

export interface SearchResultsState {
    results: any[];
    selectedDate: string;
    searchData: any;
}

export const initialState: SearchResultsState = {
    results: [],
    selectedDate: '',
    searchData: null
};

export const searchResultsReducer = createReducer(
    initialState,
    on(SearchResultsActions.updateSearchResults, (state, { results, date, searchData }) => ({
        ...state,
        results,
        selectedDate: date,
        searchData
    }))
);