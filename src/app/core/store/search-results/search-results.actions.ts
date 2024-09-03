import { createAction, props } from '@ngrx/store';

export const updateSearchResults = createAction(
    '[Search Results] Update Search Results',
    props<{ results: any[], date: string, searchData: any }>()
);

export const loadSearchResults = createAction(
    '[Search Results] Load Search Results',
    props<{ searchData: any }>()
);
