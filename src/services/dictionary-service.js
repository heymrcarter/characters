import axios from 'axios'

export function getDefinition (word) {
  return new Promise((resolve, reject) => {
    const url = `${process.env.DICTIONARY_API_ENDPOINT}?search=${word}&headword=${word}&part_of_speech=adjective`
    axios.get(url)
      .then(response => {
        var definition = response.data.results.find(w => w.senses.find(s => s.definition) !== undefined).senses[0].definition
        resolve(Array.isArray(definition) ? definition[0] : definition)
      })
      .catch(error => reject(error))
  })
}
