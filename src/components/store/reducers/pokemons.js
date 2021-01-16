const INITIAL_STATE = {
    results: []
};

export default function pokemons(state = INITIAL_STATE, action) {
    
    switch(action.type) {
        case "set_pokemon_list": {
            return {
                ...state,
                results: action.results
            }
        }
    }

    return state;
}