import React, { FC } from 'react';
import '../styles.scss';
import { NavBar } from 'components/Navbar';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Home from 'components/Home';
import About from 'components/About';
import Lessons from 'components/Lessons';
import { FAQ } from 'components/FAQ';
import './App.css';
import Posts from 'components/Posts';
import FilteredPostsView from 'components/FilteredPostsView';
import {
    AdminHome,
    AdminLessons,
    AdminGrammar,
    AdminLogin,
    AdminPostCreate,
    AdminPostEdit,
} from 'components/Admin';
import ScrollToTop from 'components/ScrollToTop';
import Grammar from "../Grammar";

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
                            <Route path="/grammar" exact component={Grammar} />
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
                                component={AdminHome}
                            />
                            <Route
                                path="/admin/login"
                                exact
                                component={AdminLogin}
                            />
                            <Route
                                path="/admin/post/:postId/"
                                exact
                                component={AdminPostEdit}
                            />
                            <Route
                                path="/admin/posts/new"
                                exact
                                component={AdminPostCreate}
                            />
                            <Route
                                path="/admin/lessons"
                                exact
                                component={AdminLessons}
                            />
                            <Route
                                path="/admin/grammar"
                                exact
                                component={AdminGrammar}
                            />
                            <Redirect from="/admin" to="/admin/login" />
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};
