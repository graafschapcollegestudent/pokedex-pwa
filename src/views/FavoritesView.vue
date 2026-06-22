<script setup>
import { onMounted, ref } from 'vue'
import { getImageUrl, loadFavorites, pokemonTypes } from '@/helpers/pokemon.js'
import { usePokemonSheet } from '@/composables/usePokemonSheet.js'
import { usePokemonFilters } from '@/composables/usePokemonFilters.js'
import PokemonSheet from '@/components/PokemonSheet.vue'
import '@/styles/pokemon-card.css'

const favorites = ref([])

const { sheetOpen, selectedPokemon, evolutionChain, openSheet } = usePokemonSheet()
const { searchQuery, selectedType, filterByType, filterSearch } = usePokemonFilters(favorites)

onMounted (() => {
  favorites.value = loadFavorites()
});

const removeFavorite = (poke) => {
  favorites.value = favorites.value.filter(f => f.name !== poke.name)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}
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

        <v-row v-if="filterSearch.length > 0">
          <v-col
            cols="6" sm="4" md="3"
            v-for="fav in filterSearch"
            :key="fav.name"
          >
            <v-card 
              @click="openSheet(fav)"
              color="grey-darken-3" 
              rounded="xl"
              elevation="4"
              class="pokemon-card"
            >
              <v-img :src="getImageUrl(fav.url)" height="110" contain class="mt-2" />
              <v-card-title class="text-capitalize text-center text-body-2 pb-1">
                {{ fav.name }}
              </v-card-title>
              <v-btn 
                icon 
                size="small"
                variant="text"
                color="red-accent-2"
                class="favorite-btn"
                @click.stop="removeFavorite(fav)"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else justify="center" class="mt-8">
          <v-col cols="auto" class="text-center">
            <v-icon size="64" color="grey-darken-1">mdi-heart-off-outline</v-icon>
            <p class="text-grey mt-2">Nog geen favorieten toegevoegd</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <PokemonSheet 
      v-model="sheetOpen" 
      :pokemon="selectedPokemon" 
      :evolution-chain="evolutionChain" 
    />
</template>