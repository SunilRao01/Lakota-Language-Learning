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
import styles from './App.module.scss';
import Posts from 'components/Posts';
import FilteredPostsView from 'components/FilteredPostsView';
import {
    AdminGrammar,
    AdminHome,
    AdminLessons,
    AdminLogin,
    AdminPodcasts,
    AdminPostCreate,
    AdminPostEdit,
    AdminSitemap,
    AdminVocabulary,
} from 'components/Admin';
import ScrollToTop from 'components/ScrollToTop';
import Grammar from '../Grammar';
import Vocabulary from '../Vocabulary';
import Podcasts from '../Podcasts';
import Sitemap from '../Sitemap';

export const App: FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <header className="App-header">
                    <NavBar />
                </header>

                <div className={styles.body}>
                    <main className={styles.MainContent}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" exact component={About} />
                            <Route path="/lessons" exact component={Lessons} />
                            <Route path="/grammar" exact component={Grammar} />
                            <Route
                                path="/podcasts"
                                exact
                                component={Podcasts}
                            />
                            <Route path="/sitemap" exact component={Sitemap} />
                            <Route
                                path="/vocabulary"
                                exact
                                component={Vocabulary}
                            />
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
                            <Route
                                path="/admin/vocabulary"
                                exact
                                component={AdminVocabulary}
                            />
                            <Route
                                path="/admin/podcasts"
                                exact
                                component={AdminPodcasts}
                            />
                            <Route
                                path="/admin/sitemap"
                                exact
                                component={AdminSitemap}
                            />
                            <Redirect from="/admin" to="/admin/login" />
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};
