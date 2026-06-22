import { ref } from 'vue'

export function usePokemonSheet() {
  const sheetOpen = ref(false)
  const selectedPokemon = ref(null)
  const evolutionChain = ref([])

  const fetchEvolutionChain = async (speciesUrl) => {
    const speciesResponse = await fetch(speciesUrl)
    const speciesData = await speciesResponse.json()

    const evoResponse = await fetch(speciesData.evolution_chain.url)
    const evoData = await evoResponse.json()

    const chain = []
    let current = evoData.chain

    while (current) {
      chain.push({
        name: current.species.name,
        url: current.species.url
      })
      current = current.evolves_to[0]
    }

    evolutionChain.value = chain
  }

  const openSheet = async (selectedP) => {
    selectedPokemon.value = selectedP
    sheetOpen.value = true

    const response = await fetch(selectedP.url)
    const data = await response.json()
    selectedPokemon.value = data

    await fetchEvolutionChain(data.species.url)
  }

  return {
    sheetOpen,
    selectedPokemon,
    evolutionChain,
    openSheet
  }
}