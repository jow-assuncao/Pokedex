import React, { useState, useEffect, useCallback } from 'react';
import {
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import * as axios from 'axios';
import * as PokemonActions from '../components/store/actions/actions';
import { bindActionCreators } from 'redux';

import Card from './Card';

const Lista = ({ pokemons, acSetPokemonList }) => {
    const [data, setData] = useState(pokemons);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    const getData = async () => {
        // Definimos uma nova lista que irá receber 
        // os resultados de uma nova busca ao chegar no fim da página
        let newList = data;

        // Realizamos a busca utilizando os valores de limite e offset na requisição
        const fetchChars = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(response => response.data)
        fetchChars.results.map(char => newList.push(char));

        // Setamos o state que utiliza a lista que retornou da requisição
        // e atualizamos o redux que contém a lista de pokemons
        setData(newList);
        acSetPokemonList(newList);

        // Atualizamos os valores de limite e offset
        // preparando as variáveis para uma nova busca
        // ao chegar no fim da página
        setOffset(offset + 20);
        setLimit(limit + 20);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={useCallback(item => {
                const pokemon = item.item;
                
                return (
                    <Card
                        pokemon={pokemon}
                        index={item.index}
                    />
                )
            }, [data])}
            initialNumToRender={20}
            onEndReachedThreshold={0.5}
            onEndReached={getData}
            showsVerticalScrollIndicator={false}
        />
    );
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.results
});

const mapDispatchToProps = dispatch => bindActionCreators(PokemonActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Lista);