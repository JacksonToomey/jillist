import { createSelector } from 'reselect'

export const makeGetModalState = modalName => ({ modals }) => modals.get(modalName);

export const makeGetShowModal = modalName => createSelector(
    [makeGetModalState(modalName)],
    modalState => modalState.get('show')
)

export const makeGetModalData = modalName => createSelector(
    [makeGetModalState(modalName)],
    modalState => modalState.get('data')
)

export const makeGetModalErrors = modalName => createSelector(
    [makeGetModalState(modalName)],
    modalState => modalState.get('errors')
)