import React, { Component } from 'react';
import './App.css';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/serch-box/search-box.component';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };   
  }
 
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    //fetching data set from this url
    .then(response => response.json())
    //taking the response and converting url to json format that JS can understand and use
    .then(users => this.setState({ monsters: users }));
    //take users we got back from url and set monsters to that array of users
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value}); 
  }

  render() {
    const { monsters, searchField } = this.state;
    // same as const monsters = this.state.monsters;
    // const searchField = this.state.searchField;

    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters' 
          handleChange= {this.handleChange}
        />
        
        < CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
