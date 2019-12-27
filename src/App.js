import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    url: '',
    scrapData: null,
    loading: false,
    showDownloadBtn: false,
    isError: false,
    darkMode: false
  }

  handleClick = (e) => {
    this.setState({ loading: true })
    e.preventDefault();
    let scrapData = '';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = "https://app.zenscrape.com/api/v1/get?url=" + this.state.url + "&render=&premium=&apikey=15a8d570-2735-11ea-bad3-cd0e72860b8f";
    axios.get(proxyurl + url)
      .then(response => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        scrapData = response.data;
        this.setState({ scrapData, loading: false, showDownloadBtn: true });
        console.log('scrapData', scrapData)
      }).catch((err) => {
        console.log('error')
        this.setState({ isError: true, loading: false })
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value, showDownloadBtn: false, isError: false })
  }
  downloadFile = () => {
    window.download(this.state.scrapData, "webpage.html", "text/plain");
  }
  resetErrorMsg = () => {
    this.setState({ isError: false })
  }
  darkmode = () => {
    this.setState({ darkMode: !this.state.darkMode }, () => {
      if (this.state.darkMode) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.body.style.transition = "all 2s";
      } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        document.body.style.transition = "all 2s";
      }
    })
  }
  render() {
    return (
      <div className="App">
        <div className="modes container" onClick={this.darkmode}>{!this.state.darkMode ? 'dark' : 'light'}</div><br></br>
        <div className="formblock">
          {this.state.loading ? 'loading' : 'not loading'}
          <h1>Web Scrapper</h1>
          <form onSubmit={this.handleClick} className="form">
            <input type="text" onFocus={this.resetErrorMsg} className="form-control" onChange={this.handleChange} id="url" aria-describedby="url" placeholder="enter url"></input>
            {this.state.showDownloadBtn ? <button className="btn btn-dark" onClick={this.downloadFile}>download</button> : <button className="btn btn-dark">scrap</button>}

          </form>
          {this.state.isError ? 'error in url' : ''}
        </div>
      </div>
    )
  }
}


export default App;
