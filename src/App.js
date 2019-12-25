import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    url: '',
    scrapData: null,
    loading: false,
    showDownloadBtn: false,
    isError: false
  }

  handleClick = (e) => {
    this.setState({loading:true})
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
        this.setState({ scrapData , loading: false, showDownloadBtn:true});
        console.log('scrapData', scrapData)
      }).catch((err)=>{
console.log('error')
this.setState({isError:true})
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.id]: e.target.value, showDownloadBtn:false, isError:false })
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? 'loading': 'not loading'}
        <form onSubmit={this.handleClick}>
          <input type="text" onChange={this.handleChange} id="url"></input>
          {this.state.showDownloadBtn ?  <button >download</button> :  <button >get web page</button>}
          {this.state.isError ? 'error in url': ''}
        </form>
      </div>
    )
  }
}


export default App;
