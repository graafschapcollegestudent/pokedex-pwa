<script setup>
import { getImageUrl } from '@/helpers/pokemon.js'

defineProps({
  modelValue: Boolean,
  pokemon: Object,
  evolutionChain: Array
})

defineEmits(['update:modelValue'])
</script>
<template>
  <v-bottom-sheet :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <v-card v-if="pokemon" color="grey-darken-4" rounded="t-xl">
      <div class="text-center pt-4">
        <v-img
          :src="pokemon?.sprites?.front_default"
          height="160"
          contain
        />
      </div>
      <v-card-title class="text-capitalize text-h5 text-center font-weight-bold">
        {{ pokemon.name }}
      </v-card-title>

      <v-card-text>
        <v-row class="text-center" no-gutters>
          <v-col>
            <p class="text-caption text-grey">Gewicht</p>
            <p class="text-body-1 font-weight-medium">{{ pokemon.weight }}</p>
          </v-col>
          <v-col>
            <p class="text-caption text-grey">Hoogte</p>
            <p class="text-body-1 font-weight-medium">{{ pokemon.height }}</p>
          </v-col>
        </v-row>

        <div class="text-center mt-3">
          <v-chip
            v-for="t in pokemon.types"
            :key="t.type.name"
            class="ma-1 text-capitalize"
            color="red-darken-3"
            variant="elevated"
            size="small"
          >
            {{ t.type.name }}
          </v-chip>
        </div>
      </v-card-text>

      <v-card-text v-if="evolutionChain.length > 1">
        <p class="text-subtitle-1 mb-2 font-weight-medium">Evolutielijn</p>
        <v-row align="center" justify="center" no-gutters>
          <template v-for="(evo, index) in evolutionChain" :key="evo.name">
            <v-col cols="auto" class="text-center">
              <v-avatar size="70" color="grey-darken-3">
                <v-img :src="getImageUrl(evo.url)" contain />
              </v-avatar>
              <p class="text-capitalize text-caption mt-1">{{ evo.name }}</p>
            </v-col>
            <v-col v-if="index < evolutionChain.length - 1" cols="auto" class="px-2">
              <v-icon color="red-darken-3">mdi-arrow-right-bold</v-icon>
            </v-col>
          </template>
        </v-row>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>