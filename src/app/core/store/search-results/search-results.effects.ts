
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UpdateSearchService } from '../../../core/services/user/update-search.service';
import * as SearchResultsActions from './search-results.actions';

@Injectable()
export class SearchResultsEffects {
    loadSearchResults$ = createEffect(() => this.actions$.pipe(
        ofType(SearchResultsActions.loadSearchResults),
        mergeMap(({ searchData }) => this.updateSearchService.updateSearch(searchData)
            .pipe(
                map(results => SearchResultsActions.updateSearchResults({
                    results,
                    date: searchData.date,
                    searchData
                })),
                catchError(() => of(SearchResultsActions.updateSearchResults({
                    results: [],
                    date: '',
                    searchData: null
                })))
            ))
    )
    );

    constructor(
        private actions$: Actions,
        private updateSearchService: UpdateSearchService
    ) { }
}