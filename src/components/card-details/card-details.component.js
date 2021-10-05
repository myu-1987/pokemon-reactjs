import React, {Component} from 'react';
import { Button, Pagination } from 'react-bootstrap';


import './card-details.styles.css';

import './../card/card.styles.css';

export class CardDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemonDetails: []
        }
    }

    componentDidMount(){
        this.pokemonDetails(this.props.match.params.id);
      }

    pokemonDetails(id) {
        const URL = "https://pokeapi.co/api/v2/pokemon/"+id
        console.log(URL);
        fetch(URL)
        .then(response => response.json())
        .then((results) => {
          console.log(results);
          this.setState({
              pokemonDetails:results
            });
        }
        )
    }

    goBack(){
        this.props.location.state = {
            limit: this.props.match.params.limit
        }
        const state = {
            limit: this.props.match.params.limit,
            offset: this.props.match.params.offset
        }
        // console.log(this.props.location)
        localStorage.setItem('limit', state.limit);
        localStorage.setItem('offset', state.offset);
        window.history.back();
    }

    render(){
        const { pokemonDetails } = this.state;
        console.log('texr', pokemonDetails )
        return(
            <div className="card-continer">
                 <Button variant="primary" className="mb-5 back-button" onClick={this.goBack.bind(this)}>Back</Button> 
                <div className="media">
                    <img alt="pokemon"  className="mr-3"  src={`https://img.pokemondb.net/artwork/large/${pokemonDetails.name}.jpg`}/>
                    <div className="media-body">
                        <h5 className="mt-0"><strong>Name:</strong> {pokemonDetails.name}</h5>
                        <h5 className="mt-0"><strong>Height:</strong> {pokemonDetails.height}</h5>
                        <h5 className="mt-0"><strong>Weight:</strong> {pokemonDetails.weight}</h5>
                        <div className="badge-panel">
                        <h5>Abilities</h5>
                        {pokemonDetails.abilities && pokemonDetails.abilities.map(data =>(
                                <span>{data.ability.name}</span>
                        ))}
                        </div>
                        <br/>
                        <div className="badge-panel">
                        <h5>Moves</h5>
                        {pokemonDetails.moves && pokemonDetails.moves.map(data =>(
                               <span>{data.move.name}</span>
                        ))}
                        </div>
                        <br/>
                        <div className="badge-panel">
                        <h5>Types</h5>
                        {pokemonDetails.types && pokemonDetails.types.map(data =>(
                                <span>{data.type.name}</span>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetails;