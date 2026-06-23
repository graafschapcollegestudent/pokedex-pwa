import { ref, computed } from 'vue'
import { filterByName } from '@/helpers/pokemon.js'

export function usePokemonFilters(sourceList) {
  const searchQuery = ref('')
  const selectedType = ref(null)
  const typeFilteredList = ref([])

  const filterByType = async (type) => {
    selectedType.value = type

    if (!type) {
      typeFilteredList.value = []
      return
    }

    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await response.json()
    typeFilteredList.value = data.pokemon.map(p => p.pokemon)
  }

  const preSearchList = computed(() => {
    if (!selectedType.value) {
      return sourceList.value
    }
    return sourceList.value.filter(item =>
      typeFilteredList.value.some(t => t.name === item.name)
    )
  })

  const filterSearch = computed(() => filterByName(preSearchList.value, searchQuery.value))

  return {
    searchQuery,
    selectedType,
    filterByType,
    filterSearch
  }
}