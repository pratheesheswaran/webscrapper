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
    darkMode: false,
    errorMsg: ''
  }
  componentDidMount() {
    this.initDarkMode();
  }
  handleClick = (e) => {
    e.preventDefault();
    if (this.state.url) {
      this.setState({ loading: true, errorMsg:'', isError: false })
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
          this.setState({ isError: true, loading: false, errorMsg: 'try again' })
        })
    } else {
      this.setState({ errorMsg: 'please enter url' })
    }

  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value, showDownloadBtn: false, isError: false, errorMsg: '' })
  }
  downloadFile = () => {
    window.download(this.state.scrapData, "webpage.txt", "text/plain");
    this.setState({ showDownloadBtn: false })
  }
  resetErrorMsg = () => {
    this.setState({ isError: false, errorMsg: '' })
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
  initDarkMode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      this.setState({ darkMode: true })
    }

  }
  render() {
    return (
      <div className="App">
        <div className="modes container" onClick={this.darkmode}>{!this.state.darkMode ? 'dark' : 'light'}</div><br></br>
        <div className="formblock">
          <p id="loading">{this.state.loading ? 'loading' : 'not loading'}</p>
          <h1>Web Scraper</h1>
          <form onSubmit={this.handleClick} className="form">
            <input type="text" onFocus={this.resetErrorMsg} className="form-control" onChange={this.handleChange} id="url" aria-describedby="url" placeholder="enter url"></input>
            {this.state.showDownloadBtn ? <button className="btn btn-dark" onClick={this.downloadFile}>download</button> : <button className="btn btn-dark">scrap</button>}

          </form>
          <div id="errorMsg">{this.state.errorMsg}</div>
        </div>

      </div>
    )
  }
}


export default App;
