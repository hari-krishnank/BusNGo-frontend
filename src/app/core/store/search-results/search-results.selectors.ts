import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchResultsState } from './search-results.reducer';

export const selectSearchResultsState = createFeatureSelector<SearchResultsState>('searchResults');

export const selectSearchResults = createSelector(
    selectSearchResultsState,
    (state) => state.results
);

export const selectSelectedDate = createSelector(
    selectSearchResultsState,
    (state) => state.selectedDate
);

export const selectSearchData = createSelector(
    selectSearchResultsState,
    (state) => state.searchData
);
