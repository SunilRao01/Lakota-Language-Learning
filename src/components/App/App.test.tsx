import React from 'react';
import {shallow} from "enzyme";
import {App} from "./App.component";
import {Route} from "react-router";
import {Home} from "../Home/Home.component";
import {About} from '../About/About.component'
import {Lessons} from '../Lessons/Lessons.component'
import {FAQ} from '../FAQ/FAQ.component'

describe('contains all Routes', () => {
    const wrapper = shallow(<App />);

    it('should have the Home path', () => {
        expect(wrapper.find(Route).at(0).props().component).toEqual(Home)
        expect(wrapper.find(Route).at(0).props().path).toEqual('/')
    })

    it('should have the About path', () => {
        expect(wrapper.find(Route).at(1).props().component).toEqual(About)
        expect(wrapper.find(Route).at(1).props().path).toEqual('/about')
    })

    it('should have the Lessons path', () => {
        expect(wrapper.find(Route).at(2).props().component).toEqual(Lessons)
        expect(wrapper.find(Route).at(2).props().path).toEqual('/lessons')
    })

    it('should have the FAQ path', () => {
        expect(wrapper.find(Route).at(3).props().component).toEqual(FAQ)
        expect(wrapper.find(Route).at(3).props().path).toEqual('/faq')
    })
})
