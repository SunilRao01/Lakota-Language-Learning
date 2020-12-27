import { initialRootState } from 'redux/store';
import { mapStateToProps } from './FilteredPostsView.types';

describe('FilteredPostsView Component', () => {
    describe('redux', () => {
        it('should map store to props', () => {
            const startingRootState = initialRootState;
            startingRootState.postState.posts = [];
            startingRootState.filterState.filters.categories = ['filter cat'];
            startingRootState.filterState.filters.tags = ['filter tag'];

            const actualProps = mapStateToProps(startingRootState);

            actualProps.posts = [];
        });
    });
});
