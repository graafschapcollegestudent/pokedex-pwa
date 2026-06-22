export const getIdFromUrl = (url) => {
  return url.split('/')[6]
}

export const getImageUrl = (url) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(url)}.png`
}

export const filterByName = (list, query) => {
  return list.filter(p =>
    p.name.toLowerCase().includes((query || '').toLowerCase())
  )
}

export const loadFavorites = () => {
  const saved = localStorage.getItem('favorites')
  return saved ? JSON.parse(saved) : []
}

export const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy'
]