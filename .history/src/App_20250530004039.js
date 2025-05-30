import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {


  api_key = process.env.REACT_APP_NEWS_API;
  
  state = {
    progress: 0
  }

  setProgress = (progress) =>{
    this.setState({
      progress: progress
    });
  }

  render() {
    return (
      <Router>
        <>
        <LoadingBar
          color="#ff0000"
          progress={this.state.progress}
        />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={5} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={5} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={5} category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={5} category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={5} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={5} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={5} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={5} category="technology" />} />
          </Routes>
        </>
      </Router>
    );
  }
}
