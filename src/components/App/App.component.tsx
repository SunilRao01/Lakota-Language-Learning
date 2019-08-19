import React, {FC} from 'react';
import '../styles.scss'
import {NavBar} from "../Navbar/Navbar.component";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Home} from "../Home/Home.component";
import {About} from "../About/About.component";
import {Lessons} from "../Lessons/Lessons.component";
import {FAQ} from "../FAQ/FAQ.component";
import './App.css'
import {Posts} from '../Posts/Posts.component'
import {FilteredPostsView} from '../FilteredPostsView/FilteredPostsView.component'
import {PostsView} from '../Admin/PostsView.component'

export const App: FC = () => {
    return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <NavBar/>
                    </header>
                    <div className="body">
                        <main className="main-content">
                            <Route path='/' exact component={Home}/>
                            <Route path='/about' exact component={About}/>
                            <Route path='/lessons' exact component={Lessons}/>
                            <Route path='/faq' exact component={FAQ}/>
                            <Route path='/post/:postId' exact component={Posts}/>
                            <Route path='/posts' component={FilteredPostsView}/>
                            <Route path='/admin/posts' component={PostsView} />
                        </main>
                    </div>
                </div>
            </Router>
    );
};
