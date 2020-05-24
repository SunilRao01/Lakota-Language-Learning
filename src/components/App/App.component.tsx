import React, {FC} from 'react';
import '../styles.scss'
import {NavBar} from '../Navbar/Navbar.component';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import {Home} from '../Home/Home.component';
import {About} from '../About/About.component';
import {Lessons} from '../Lessons/Lessons.component';
import {FAQ} from '../FAQ/FAQ.component';
import './App.css'
import {Posts} from '../Posts/Posts.component'
import {FilteredPostsView} from '../FilteredPostsView/FilteredPostsView.component'
import {PostsView} from '../Admin/PostsView.component'
import {PostEdit} from '../Admin/PostEdit.component'
import {AdminLogin} from '../Admin/AdminLogin.component'
import {PostCreate} from '../Admin/PostCreate.component'
import {AdminLessons} from '../Admin/AdminLessons.component'
import ScrollToTop from '../ScrollToTop.component'
import { Helmet } from 'react-helmet';

export const App: FC = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="App">
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>

                    <title>Lakota Language Learning</title>
                    <meta name="description" content="Lakota lessons and language tools" />
                </Helmet>

                <header className="App-header">
                    <NavBar/>
                </header>

                <div className="body">
                    <main className="main-content">
                        <Switch>
                            <Route path='/' exact component={Home}/>
                            <Route path='/about' exact component={About}/>
                            <Route path='/lessons' exact component={Lessons}/>
                            <Route path='/faq' exact component={FAQ}/>
                            <Route path='/post/:postId' exact component={Posts}/>
                            <Route path='/posts' component={FilteredPostsView}/>

                            <Route path='/admin/posts' exact component={PostsView}/>
                            <Route path='/admin/login' exact component={AdminLogin}/>
                            <Route path='/admin/post/:postId/' exact component={PostEdit}/>
                            <Route path='/admin/posts/new' exact component={PostCreate}/>
                            <Route path='/admin/lessons' exact component={AdminLessons}/>
                            <Redirect from='/admin' to='/admin/login'/>
                        </Switch>
                    </main>
                </div>
            </div>
        </Router>
    );
};
