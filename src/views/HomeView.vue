<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { getImageUrl, loadFavorites, pokemonTypes } from '@/helpers/pokemon.js'
import { usePokemonSheet } from '@/composables/usePokemonSheet.js'
import { usePokemonFilters } from '@/composables/usePokemonFilters.js'
import PokemonSheet from '@/components/PokemonSheet.vue'
import '@/styles/pokemon-card.css'

const pokemon = ref([])
const currentPage = ref(1)
const perPage = 20
const favorites = ref([])

const { sheetOpen, selectedPokemon, evolutionChain, openSheet } = usePokemonSheet()
const { searchQuery, selectedType, filterByType, filterSearch } = usePokemonFilters(pokemon)

watch(searchQuery, () => {
  currentPage.value = 1
})

const paginatedPokemon = computed(()=>{
    const start = (currentPage.value - 1) * perPage
    const end = start + perPage
    return filterSearch.value.slice(start, end)
})

const toggleFavorite = (poke) => {
  const index = favorites.value.findIndex(f => f.name === poke.name)
  
  if (index === -1) {
    favorites.value.push(poke)
  } else {
    favorites.value.splice(index, 1)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

const isFavorite = (poke) => {
  return favorites.value.some(f => f.name === poke.name)
}

onMounted (async() => {
const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
const data = await response.json()
pokemon.value = data.results

  favorites.value = loadFavorites()
})
</script>
<template>
    <v-main>
      <v-container>
        <v-text-field
          v-model="searchQuery"
          label="Zoek een Pokémon..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          clearable
          class="my-4"
        />
        <v-select
          v-model="selectedType"
          :items="pokemonTypes"
          label="Filter op type"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          clearable
          @update:model-value="filterByType"
          class="mb-6"
        />
        <v-row>
          <v-col
            cols="6" sm="4" md="3"
            v-for="pokemons in paginatedPokemon"
            :key="pokemons.name"
          >
            <v-card 
              @click="openSheet(pokemons)" 
              color="grey-darken-3" 
              rounded="xl"
              elevation="4"
              class="pokemon-card"
            >
              <v-img :src="getImageUrl(pokemons.url)" height="110" contain class="mt-2" />
              <v-card-title class="text-capitalize text-center text-body-2 pb-1">
                {{ pokemons.name }}
              </v-card-title>
              <v-btn 
                icon 
                size="small"
                variant="text"
                :color="isFavorite(pokemons) ? 'red-accent-2' : 'grey-lighten-1'"
                class="favorite-btn"
                @click.stop="toggleFavorite(pokemons)"
              >
                <v-icon>{{ isFavorite(pokemons) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(filterSearch.length / perPage)"
          class="my-6"
          color="red-darken-3"
          density="comfortable"
        />
      </v-container>
    </v-main>

    <PokemonSheet 
      v-model="sheetOpen" 
      :pokemon="selectedPokemon" 
      :evolution-chain="evolutionChain" 
    />
</template>