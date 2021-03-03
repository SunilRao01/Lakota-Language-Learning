import { Post } from '../../redux/Posts/Posts.reducer';

export interface PostCardProps {
    post: Post;
    onClickTag?: (e: any) => void;
    onClickCategory?: (e: string) => void;
    showTitleOnly?: boolean;
    showPreviewOnly?: boolean;
}
