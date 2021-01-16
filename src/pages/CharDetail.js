import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import * as axios from 'axios';

const CharDetail = ({ route }) => {
    const [charDescription, setCharDescription] = useState('');

    const pokemonName = route.params[0].name;
    const stats = route.params[2].stats;
    const skills = route.params[2].abilities;
    const pokemonNumber = route.params[3];

    const getDescription = async () => {
        // Buscamos a descrição do personagem

        const fetchDescription = await axios.get(`https://pokeapi.co/api/v2/characteristic/${route.params[2].id}`).then(response => response.data);

        // Realizamos o processo de junção das descrições
        // que recebemos por array unindo em uma só string
        let description = [];
        fetchDescription.descriptions.map(desc => {
            if (desc.description) description.push(desc.description);
        })

        description = description.join('. ')
        setCharDescription(description);
    }

    useEffect(() => {
        getDescription();
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.charHeader}>
                    <Image
                        source={{ uri: route.params[1] }}
                        style={styles.img}
                    />
                    <View style={styles.txts}>
                        <Text style={styles.number}>#{pokemonNumber}</Text>
                        <Text style={styles.name}>{pokemonName}</Text>
                    </View>
                </View>
                <View style={styles.charBody}>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.description}>{charDescription}</Text>
                        <Text style={styles.dataTitle}>Pokédex Data</Text>

                        {/*HP*/}
                        <View style={styles.stats}>
                            <Text style={styles.statName}>{stats[0]['stat']['name'].toUpperCase()}</Text>
                            <Text style={styles.statValue}>{stats[0]['base_stat']}</Text>
                        </View>

                        {/*ATAQUE*/}
                        <View style={styles.stats}>
                            <Text style={styles.statName}>{stats[1]['stat']['name'].toUpperCase()}</Text>
                            <Text style={styles.statValue}>{stats[1]['base_stat']}</Text>
                        </View>

                        {/*DEFESA*/}
                        <View style={styles.stats}>
                            <Text style={styles.statName}>{stats[2]['stat']['name'].toUpperCase()}</Text>
                            <Text style={styles.statValue}>{stats[2]['base_stat']}</Text>
                        </View>

                        {/*VELOCIDADE*/}
                        <View style={styles.stats}>
                            <Text style={styles.statName}>{stats[5]['stat']['name'].toUpperCase()}</Text>
                            <Text style={styles.statValue}>{stats[5]['base_stat']}</Text>
                        </View>

                        {/*HABILIDADES*/}
                        <Text style={styles.statName}>HABILIDADES: </Text>
                        {skills.map((skill, index) => (
                            <View
                                style={styles.stats}
                                key={index.toString()}
                            >
                                <Text style={[styles.statValue, { marginLeft: 15 }]}>- {skill.ability.name.toUpperCase()}</Text>
                            </View>
                        ))}

                    </View>
                </View>

            </View>

        </View>
    )
};

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#8bbe8a',
        height: WINDOW_HEIGHT
    },
    container: {
        marginTop: 30,
    },
    // estilização do header
    charHeader: {
        height: WINDOW_HEIGHT * 0.22,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 30
    },
    img: {
        width: 150,
        height: 150,
        marginRight: 35
    },
    txts: {
        height: 100,
        justifyContent: 'space-around'
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        opacity: 0.5,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white'
    },
    // estilização do body
    charBody: {
        backgroundColor: 'white',
        borderRadius: 30,
    },
    bodyContainer: {
        marginHorizontal: 30,
        height: WINDOW_HEIGHT,
        paddingTop: 30
    },
    description: {
        opacity: 0.5,
        color: 'black',
        marginBottom: 15
    },
    dataTitle: {
        color: '#8bbe8a',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200
    },
    statName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statValue: {
        fontSize: 16,
        opacity: 0.7,
    },
})

export default CharDetail;