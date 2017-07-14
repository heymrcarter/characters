<template>
  <div class="adjective pulse">
    <h1>{{ word }}</h1>
    <p class="definition">{{ definition }}</p>
  </div>
</template>

<script>
import { getDefinition } from '../services/dictionary-service'

export default {
  name: 'character',
  data () {
    return {
      definition: undefined
    }
  },
  props: ['word'],
  watch: {
    word (newWord) {
      const self = this
      getDefinition(this.word)
        .then(definition => {
          self.definition = definition
        })
        .catch(() => { self.definition = 'no definition available' })
    }
  },
  methods: {
  },
  mounted () {
    // this.fetchDefinition(this.word)
  }
}
</script>

<style lang="less" scoped>
.adjective {
  background-color: black;
  color: white;
  font-family: 'Avenir', sans-serif;
  padding: 15px;
  text-align: center;
  z-index: 100;

  h1 {
    text-transform: uppercase;
    font-size: 40px;
    letter-spacing: 3px;
  }

  .definition {}
}
</style>
