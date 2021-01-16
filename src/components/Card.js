import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as axios from 'axios';

const Card = ({ pokemon }) => {
    const [pokemonThumb, setPokemonThumb] = useState(null);
    const [charDetails, setCharDetails] = useState({});
    const [pokemonNumber, setPokemonNumber] = useState('')

    const getCharDetail = async () => {
        // Buscamos os detalhes do personagem
        // para renderizarmos a imagem
        const fetchDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(response => response.data);

        // utilizamos o padStart para encaixar o id
        // do personagem na máscara de 3 dígitos
        const idNumber = JSON.stringify(fetchDetails.id).padStart(3, '0')
        
        setCharDetails(fetchDetails);
        setPokemonThumb(fetchDetails['sprites']['other']['official-artwork']['front_default']);
        setPokemonNumber(idNumber);
    }

    const navigation = useNavigation();

    useEffect(() => {
        getCharDetail();
    }, [])



    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Char Detail', [pokemon, pokemonThumb, charDetails])}
            >
                <Image
                    source={{ uri: pokemonThumb }}
                    style={styles.img}
                />
                <Text style={styles.number}>#{pokemonNumber}</Text>
                <Text style={styles.name}>{pokemon.name}</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#8bbe8a',
        borderRadius: 8,
        padding: 15,
        marginVertical: 20,
        // shadowColor: "#000",
        // shadowRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: .5,

    },
    number: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        opacity: 0.5,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
    img: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 10,
        top: -45
    },
})

export default Card;