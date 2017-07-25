<template>
  <div class='root-view flex-column vfull'>
    <adjective ref='adjective' :word='adjective' class='adjective flex-zero'></adjective>
    <div class='flex-one flex-row flex-center vfull characters'>
      <div @click='characterSelected(starWars)' class='flex-one vfull'>
        <character class='vfull' :voice='voice' :character='starWars' :bg-tint="backgroundTint('starWars')"></character>
      </div>
      <div class='vs-container'>
        <a @click="characterSelected([starWars, marvel])" class="both">Both</a>
        <div class='vs pulse'>VS</div>
        <a @click="characterSelected()" class="neither">Neither</a>
      </div>
      <div @click='characterSelected(marvel)' class='flex-one vfull'>
        <character class='vfull' :voice='voice' :character='marvel' :bg-tint="backgroundTint('marvel')"></character>
      </div>
    </div>
    <div class="flex-zero">
      <transition name="slideup">
        <div class="results-bar flex flex-row" v-if="results.length > 0">
          <router-link :to="{ name: 'Results' }">See results ({{this.results.length}})</router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Character from './Character'
import Adjective from './Adjective'
import { mapActions, mapGetters } from 'vuex'
const adjectives = require('../json/adjectives.json')
const starwarsCharacters = require('../json/starwars.json')
const marvelCharacters = require('../json/marvel.json')

export default {
  name: 'hello',
  data () {
    return {
      adjective: '',
      selectedCharacter: undefined,
      voice: undefined,
      starWars: {},
      marvel: {},
      winner: undefined
    }
  },
  computed: {
    ...mapGetters(['results'])
  },
  components: { Character, Adjective },
  methods: {
    ...mapActions(['addResult']),
    randomVoice () {
      const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'))
      return voices[Math.floor(Math.random() * voices.length)]
    },
    characterSelected (character) {
      let toSpeak, winner

      if (character === undefined) {
        toSpeak = `Neither ${this.starWars.name} nor ${this.marvel.name} are ${this.$refs.adjective.word}`
        winner = 'NEITHER'
      } else {
        if (Array.isArray(character)) {
          toSpeak = `Both ${this.starWars.name} and ${this.marvel.name} are ${this.$refs.adjective.word}`
          winner = 'BOTH'
        } else {
          toSpeak = `${character.name} is more ${this.$refs.adjective.word} than ${character === this.starWars ? this.marvel.name : this.starWars.name}`
          winner = character === this.starWars ? 'STARWARS' : 'MARVEL'
        }
      }

      this.addResult({
        starWars: this.starWars,
        marvel: this.marvel,
        winner,
        adjective: this.$refs.adjective.word
      })

      this.selectedCharacter = character
      this.winner = winner
      const utterance = new SpeechSynthesisUtterance(toSpeak)
      utterance.voice = this.voice
      window.speechSynthesis.speak(utterance)
      utterance.onend = this.next
    },
    next () {
      this.selectedCharacter = undefined
      this.winner = undefined
      this.voice = this.randomVoice()
      this.adjective = this.getRandom(adjectives)
      this.starWars = this.getRandom(starwarsCharacters)
      this.marvel = this.getRandom(marvelCharacters)
    },
    getRandom (array) {
      return array[Math.floor(Math.random() * array.length)]
    },
    backgroundTint (side) {
      if (this.winner === undefined) {
        return
      }

      switch (this.winner) {
        case 'NEITHER':
          return 'red-tint'
        case 'BOTH':
          return 'blue-tint'
        case 'STARWARS':
          if (side === 'starWars') {
            return 'green-tint'
          } else {
            return
          }
        case 'MARVEL':
          if (side === 'marvel') {
            return 'green-tint'
          } else {
            return
          }
      }
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
    margin-bottom: 15px;
    &.pulse {
      font-size: 50px;
      background-color: #333;
    }
  }

  a {
    transform: translateX(-50%);
    color: white;
    font-family: 'Avenir', sans-serif;
    margin-bottom: 15px;
    width: 75px;
    height: 75px;
    border-radius: 100px;
    background-color: #2196F3;
    text-align: center;
    line-height: 75px;
    display: inline-block;
    cursor: pointer;
    text-shadow: 0px 0px 7px black;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
    transition: transform 0.4s;
    &.neither {
      background-color: #F44336;
    }
    &:hover {
      transform: translateX(-50%) scale(1.2);
    }
  }
}
.characters {
  padding-bottom: 30px;
}

.results-bar {
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #333;

  a {
    font-family: 'Avenir', sans-serif;
    color: white;
    text-decoration: none;
    font-size: 24px;

    &:hover {
      text-decoration: underline
    }
  }
}
.slideup-enter-active, .slideup-leave-active {
  transition: height 1s ease-out;
}

.slideup-enter, .slideup-leave-to {
  height: 0;
}
</style>
