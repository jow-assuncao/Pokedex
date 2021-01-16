import React from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import Lista from '../components/Lista';

import { Provider } from 'react-redux';
import store from '../components/store';

const Home = () => {

    return (
        <View
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Provider store={store}>
                <View style={styles.view}>
                    <Text style={styles.txt}>Pokédex</Text>
                    <Lista />
                </View>
            </Provider>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,

    },
    view: {
        marginTop: 30
    },
    txt: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30
    }
})

export default Home;