import React, { FC } from 'react';
import '../styles.scss';
import { NavBar } from 'components/Navbar/Navbar.component';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import { Home } from 'components/Home/Home.component';
import { About } from 'components/About/About.component';
import { Lessons } from 'components/Lessons/Lessons.component';
import { FAQ } from 'components/FAQ/FAQ.component';
import './App.css';
import { Posts } from 'components/Posts/Posts.component';
import { FilteredPostsView } from 'components/FilteredPostsView/FilteredPostsView.component';
import { PostsView } from 'components/Admin/PostsView.component';
import { PostEdit } from 'components/Admin/PostEdit.component';
import { AdminLogin } from 'components/Admin/AdminLogin.component';
import { PostCreate } from 'components/Admin/PostCreate.component';
import { AdminLessons } from 'components/Admin/AdminLessons.component';
import ScrollToTop from 'components/ScrollToTop.component';

export const App: FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <header className="App-header">
                    <NavBar />
                </header>

                <div className="body">
                    <main className="main-content">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" exact component={About} />
                            <Route path="/lessons" exact component={Lessons} />
                            <Route path="/faq" exact component={FAQ} />
                            <Route
                                path="/post/:postId"
                                exact
                                component={Posts}
                            />
                            <Route
                                path="/posts"
                                component={FilteredPostsView}
                            />

                            <Route
                                path="/admin/posts"
                                exact
                                component={PostsView}
                            />
                            <Route
                                path="/admin/login"
                                exact
                                component={AdminLogin}
                            />
                            <Route
                                path="/admin/post/:postId/"
                                exact
                                component={PostEdit}
                            />
                            <Route
                                path="/admin/posts/new"
                                exact
                                component={PostCreate}
                            />
                            <Route
                                path="/admin/lessons"
                                exact
                                component={AdminLessons}
                            />
                            <Redirect from="/admin" to="/admin/login" />
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};
