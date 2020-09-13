import {IQuiz} from "../../redux/Posts/Posts.reducer";

export interface QuizCardProps {
    onCross?: () => void;
    quiz: IQuiz;
}
