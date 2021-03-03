import { RouterProps } from 'react-router';
import {
    backendGetPost,
    backendGetSitemap,
    backendUpdateSitemap,
    Sitemap,
} from '../../../redux/Posts/Posts.reducer';
import { RootState } from '../../../redux/store';
import { ThunkDispatch } from 'redux-thunk';

interface AdminSitemapProps {
    jwt: string;
    updatePostLoading: boolean;
    updateSitemapLoading: boolean;
    currentPost?: any;
    sitemap?: Sitemap;
}

interface AdminSitemapActions {
    updateSitemap: (sitemap: Sitemap, jwt: string) => void;
    getPost: (postId: number) => void;
    getSitemap: () => void;
}

export type AdminSitemapComponentPropsWithActions = AdminSitemapActions &
    AdminSitemapProps &
    RouterProps;

export const mapStateToProps = (state: RootState): AdminSitemapProps => {
    let newProps: AdminSitemapProps = {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading,
        updateSitemapLoading: state.postState.updatingSitemapLoading,
        sitemap: state.postState.sitemap,
    };
    if (state.postState.currentPost) {
        newProps.currentPost = state.postState.currentPost;
    }
    return newProps;
};

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminSitemapActions => {
    return {
        updateSitemap: async (sitemap: Sitemap, jwt: string) => {
            await dispatch(backendUpdateSitemap(sitemap, jwt));
        },
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId));
        },
        getSitemap: async () => {
            return await dispatch(backendGetSitemap());
        },
    };
};
