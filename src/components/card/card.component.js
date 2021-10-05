import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './card.styles.css';

export class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonDetails: []
        }
    }
    componentDidMount(){
        // this.loadPokemonCards();
        this.pokemonDetails(this.props.pokemon.url);
      }

    pokemonDetails(url) {
        // console.log(path.url);
        fetch(url)
        .then(response => response.json())
        .then((results) => {
          // console.log(name);
          this.setState({
              pokemonDetails:results
            });
        }
        )
    }

    render(){
        const { pokemonDetails } = this.state;
        return(
            <div className="card-continer">
            <Link to={`/details/${pokemonDetails.id}/${this.props.offset}/${this.props.limit}`}>
                <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${this.props.pokemon.name}.jpg`}/>
                <h2>{this.props.pokemon.name[0].toUpperCase()+this.props.pokemon.name.slice(1)}</h2>
                <h5>Height:{pokemonDetails.height}</h5>
                <h5>Weight: {pokemonDetails.weight}</h5>
                <div className="badge-panel">
                <h5>Abilities</h5>
                {pokemonDetails.abilities && pokemonDetails.abilities.map(data =>(
                    <span>{data.ability.name}</span>
                ))}
                </div>
            </Link>
        </div>
        )
    }
}

export default Card;