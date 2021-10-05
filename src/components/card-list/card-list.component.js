import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import { Card } from '../card/card.component';

import './card-list.style.css';

export class CardList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='card-list'>
                {this.props.pokemons.map(pokemon =>(
                <Card key={pokemon.name} pokemon={pokemon} offset={this.props.offset} limit={this.props.limit}></Card>
                ))}
            </div>
        )
    }
}

export default CardList;