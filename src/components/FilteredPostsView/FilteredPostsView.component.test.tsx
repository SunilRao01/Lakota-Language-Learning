import {mapStateToProps} from './FilteredPostsView.component'
import {initialRootState} from '../../store'

describe('FilteredPostsView Component', () => {
    describe('redux', () => {
        it('should map store to props', () => {
            const startingRootState = initialRootState
            startingRootState.postState.posts = []
            startingRootState.filterState.filters.categories = ['filter cat']
            startingRootState.filterState.filters.tags = ['filter tag']

            const actualProps = mapStateToProps(startingRootState)

            actualProps.posts = []
        });
    })
})
