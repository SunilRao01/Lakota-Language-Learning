import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { backendGetSitemap, Sitemap } from '../../redux/Posts/Posts.reducer';

export interface SitemapProps {
    sitemap: Sitemap | undefined;
}

export interface SitemapActions {
    getSitemap: () => any;
}

export type SitemapPropsAndActions = SitemapProps & SitemapActions;

export const mapStateToProps = (state: RootState): SitemapProps => ({
    sitemap: state.postState.sitemap,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): SitemapActions => {
    return {
        getSitemap: async () => {
            return await dispatch(backendGetSitemap());
        },
    };
};
