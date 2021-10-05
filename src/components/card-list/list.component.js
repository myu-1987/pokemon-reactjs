import React, {Component} from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { CardList } from './card-list.component';
import '../../App.css';

// const url= 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
class List extends Component{
  constructor(){
    super();

    this.state = {
      pokemons: [],
      pagination: [],
      search:'',
      offset: 0,
      pageCount:0,
      limit: 20,
      cardPerPage: [10, 20, 50]
    };
    this.loadPokemonCards = this.loadPokemonCards.bind(this);
    this.getParams = this.getParams.bind(this);
  }

  componentDidMount(){
    // this.loadPokemonCards();
    const limit = localStorage.getItem('limit');
    const offset = localStorage.getItem('offset')
    console.log(limit, offset);
    const url= 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+offset+'';
    this.loadPokemon(url);

  }

  loadPokemonCards(value){
    const limit = this.state.limit
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+value+'&offset='+this.state.offset+'')
    .then(response => response.json())
    .then((name) => {
      // console.log(name);
      this.setState({
          pagination: name,
          pokemons:name.results,
          limit: value
        });
      }
    )
  }

  loadPokemon(url){
    const URL = url;
    fetch(URL)
    .then(response => response.json())
    .then((name) => {
        this.setState({
            pagination: name,
            pokemons:name.results
        });
      }
    )
  }

  handleChange=(e) => {
    this.setState({search: e.target.value});
  };

  getParams(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };

  previousClick(previous) {
    const params = this.getParams(previous)
    this.loadPokemon(previous);
    this.setState({
      url: previous,
      offset: params.offset,
      limit: params.limit
    });
  }

  nextClick(next) {
    const params = this.getParams(next)
    this.loadPokemon(next);
    this.setState({
      url: next,
      offset: params.offset,
      limit: params.limit
    });
  }

  selectChange(event){
    this.loadPokemonCards(event.target.value)
    console.log(event.target.value)
  }

  sortByChange(event) {
    const {pokemons} = this.state;
    pokemons.sort((a, b) =>  a.name.localeCompare(b.name))
    this.setState({ pokemons: pokemons })
    this.props.location.state = {
      sort: 'Asc'
  }
  }

  render(){
    const {pokemons, search, pagination, cardPerPage, offset, limit} = this.state;
    var fileteredPokemons = []
    if(search != '') {
      fileteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));
    } else if (this.props.location.state && this.props.location.state.sort == 'Asc') {
      fileteredPokemons = pokemons.sort((a, b) =>  a.name.localeCompare(b.name));
    } else {
      fileteredPokemons = pokemons;
    }


    const pagePerCard = cardPerPage.map(card => {
      return  <option key={card} value={card}>{card}</option>;
    });

    return(
      <div className="App">
        <h1>Pokemon Application</h1>
         <input 
              className='search'
              type='search' 
              placeholder="Search Pokemon" 
              onChange={this.handleChange.bind(this)}
          />
          <div className="filter-panel col-md-12">
          <div class="container">
          <div class="row">
            <div className="col-sm-12 col-md-4">
            <select name="select" className="form-control" onChange={this.selectChange.bind(this)} required>
              <option key="Select role" value="Select role" selected={true}>Select per page</option>
                {pagePerCard}
            </select>
            </div>
            <div className="col-sm-12 col-md-4">
            <select name="select" className="form-control" onChange={this.sortByChange.bind(this)} required>
              <option key="Select role" value="Select role" selected={true}>Sort by</option>
              <option key="name" value="name" >Sort by Name</option>
            </select>
            </div>
            </div>
          </div>
          </div>

        <CardList pokemons={fileteredPokemons} offset={offset} limit={limit}></CardList>
        <div className="pagination-panel">
          <Button variant="primary" className={pagination.previous == null ? 'invisible' : ''} onClick={this.previousClick.bind(this, pagination.previous)}>PREV</Button> <Button variant="primary" onClick={this.nextClick.bind(this, pagination.next)}>NEXT</Button>
        </div>
      </div>
    );
  }
}

export default List;