<template>
    <!-- <h1>Pokemon <span>#{{$route.params.pokeid}}</span></h1> -->
    <h1>Pokemon <span>#{{ pokeid }}</span></h1>
    <div v-if="pokemon">
       <p> {{ pokemon.name }}</p> 
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>t

<script>
export default {
    props: {
        pokeid: {
            required: true,
            type: Number
        }
    },
    data() {
        return {
            // pokeid: null
            // pokeid: this.$route.params.pokeid
            pokemon: null
        }
    },
    created() {
        // const { pokeid }=this.$route.params
        // this.pokeid = pokeid
        this.getPokemon()
    },
    methods: {
        async getPokemon() {
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokeid}`).then(r => r.json())

                console.log(pokemon)
                this.pokemon = pokemon

            } catch (error) {
                this.$router.push('/')
                console.log('No hay nada que hacer aquí')
            }

        }

    },
    watch: {
        pokeid() {
            this.getPokemon()
        }
    }
}
</script>