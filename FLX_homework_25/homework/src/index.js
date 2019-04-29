import {store} from './store';

import Table from './components/table';

import Search from './components/search';

import './style.scss';

/**
 * Render Search
 */
const search = new Search();
search.renderSearch();

/**
 * Actions
 *
 */
document.getElementById('root').addEventListener('click', dispatchActions);

function dispatchActions(e) {
    if (e.target.className === 'table__cell--remove') {
        store.dispatch({
            type: 'REMOVE',
            id: e.target.dataset.id
        });
    }
    if (e.target.className === 'load-more__button') {
        store.dispatch({
            type: 'MORE'
        });
    }
}

/**
 * Render store
 * @return {object}
 */
function main() {
    const app = new Table(store.getState(), document.querySelector('.root'));
    document
        .querySelector('body')
        .addEventListener('keyup', () => app.filterUsers());
    return app.renderTable();
}

store.subscribe(main);

document.addEventListener('DOMContentLoaded', main);
