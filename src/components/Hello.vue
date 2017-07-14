<template>
  <div class='root-view flex-column vfull'>
    <adjective ref='adjective' :word='adjective' class='adjective flex-zero'></adjective>
    <div class='flex-one flex-row flex-center vfull characters'>
      <div @click='characterSelected(starWars)' class='flex-one vfull'>
        <character class='vfull' :voice='voice' :character='starWars' :selected="isStarWarsSelected"></character>
      </div>
      <div class='vs-container'><div class='vs pulse'>VS</div></div>
      <div @click='characterSelected(marvel)' class='flex-one vfull'>
        <character class='vfull' :voice='voice' :character='marvel' :selected="isMarvelSelected"></character>
      </div>
    </div>
  </div>
</template>

<script>
import Character from './Character'
import Adjective from './Adjective'
var adjectives = require('../json/adjectives.json')
var starwarsCharacters = require('../json/starwars.json')
var marvelCharacters = require('../json/marvel.json')

// import axios from 'axios'
// import md5 from 'md5'

export default {
  name: 'hello',
  data () {
    return {
      adjective: '',
      selectedCharacter: undefined,
      voice: undefined,
      pulseOn: false,
      starWars: {},
      marvel: {}
    }
  },
  computed: {
    isStarWarsSelected () {
      return this.selectedCharacter === this.starWars
    },
    isMarvelSelected () {
      return this.selectedCharacter === this.marvel
    }
  },
  components: { Character, Adjective },
  methods: {
    randomVoice () {
      var voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'))
      console.log(voices)
      return voices[Math.floor(Math.random() * voices.length)]
    },
    characterSelected (character) {
      this.selectedCharacter = character
      var utterance = new SpeechSynthesisUtterance(`${character.name} is more ${this.$refs.adjective.word} than ${character === this.starWars ? this.marvel.name : this.starWars.name}`)
      utterance.voice = this.voice
      window.speechSynthesis.speak(utterance)
      utterance.onend = this.next
    },
    next () {
      this.selectedCharacter = undefined
      this.voice = this.randomVoice()
      this.adjective = this.getRandom(adjectives)
      this.starWars = this.getRandom(starwarsCharacters)
      this.marvel = this.getRandom(marvelCharacters)
    },
    getRandom (array) {
      return array[Math.floor(Math.random() * array.length)]
    }
  },
  mounted () {
    this.next()
  }
}
</script>

<style lang='less' scoped>
@import '../../static/less/common';

.root-view {
  position: relative;
  top: 0;
  bottom: 0;
}
.vs-container {
  width: 0px;
  overflow: visible;
  z-index: 100;
  .vs {
    transform: translateX(-50%);
    padding: 20px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    text-shadow: 0px 0px 7px black;
    border-radius: 100px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    background-color: black;
    font-size: 40px;
    color: white;
    font-family: 'Avenir', sans-serif;
    transition: background-color 1s, font-size 1s;
    &.pulse {
      font-size: 50px;
      background-color: #333;
    }
  }
}
.characters {
  padding-bottom: 30px;
}
</style>
