import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCount = createFeatureSelector<number>('count');
