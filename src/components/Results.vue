<template>
  <div class="results">
    <header>
      <router-link :to="{ name: 'Hello' }" class="flex">< Back</router-link>
      <h1 class="flex">Results</h1>
    </header>
    <ul>
      <li v-for="(result, i) in results" class="flex flex-column" :key="i">
        <div class="adjective">
          <h3>{{ result.adjective }}</h3>
        </div>
        <div class="matchup">
          <div class="contestant starwars flex-one" :style="backgroundStyle('starWars', result)">
            <p class="name">
              {{ result.starWars.name }} 
              <i v-if="result.winner === 'STARWARS'" class="fa fa-check"></i>
              <i v-if="result.winner === 'BOTH'" class="fa fa-minus"></i>
              <i v-if="result.winner === 'NEITHER'" class="fa fa-close"></i>
            </p>
          </div>
          <div class="divider flex-zero flex-column">
            <p class="vs">VS</p>
          </div>
          <div class="contestant marvel flex-one" :style="backgroundStyle('marvel', result)">
            <p class="name">
              {{ result.marvel.name }} 
              <i v-if="result.winner === 'MARVEL'" class="fa fa-check"></i>
              <i v-if="result.winner === 'BOTH'" class="fa fa-minus"></i>
              <i v-if="result.winner === 'NEITHER'" class="fa fa-close"></i>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'results',
  computed: {
    ...mapGetters(['results'])
  },
  methods: {
    backgroundStyle (side, result) {
      const backgroundImage = side === 'starWars' ? result.starWars.photo : result.marvel.photo

      switch (result.winner) {
        case 'NEITHER':
          return { background: `linear-gradient(rgba(244,67,54, 0.35), rgba(244,67,54, 0.35)), url(${backgroundImage})` }
        case 'BOTH':
          return { background: `linear-gradient(rgba(33,150,243, 0.35), rgba(33,150,243, 0.35)), url(${backgroundImage})` }
        case 'STARWARS':
          if (side === 'starWars') {
            return { background: `linear-gradient(rgba(76,175,80, 0.35), rgba(76,175,80, 0.35)), url(${backgroundImage})` }
          } else {
            return { background: `url(${backgroundImage})` }
          }
        case 'MARVEL':
          if (side === 'marvel') {
            return { background: `linear-gradient(rgba(76,175,80, 0.35), rgba(76,175,80, 0.35)), url(${backgroundImage})` }
          } else {
            return { background: `url(${backgroundImage})` }
          }
        default:
          return { background: `url(${backgroundImage})` }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../static/less/common';
.results {
  color: white;
  font-family: 'Avenir', sans-serif;
}

header {
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #4CAF50;
  justify-content: center;
  position: relative;

  a {
    color: white;
    text-decoration: none;
    position: absolute;
    left: 15px;
  }
}

ul {
  list-style: none;
  margin: 0;
  color: white;

  li {
    display: flex;
    flex-direction: column;

    .adjective {
      padding: 15px;
      background-color: #333;
      color: white;

      h3 {
        text-align: center;
        text-transform: uppercase;
      }
    }

    .matchup {
      display: flex;
      flex-direction: row;

      .divider {
        width: 0px;
        overflow: visible;
        z-index: 100;
        justify-content: center;

        .vs {
          width: 100px;
          height: 100px;
          border-radius: 100px;
          background-color: #333;
          text-align: center;
          transform: translateX(-50%);
          line-height: 100px;
          font-size: 40px;
          top: 50%;
          box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
        }
      }

      .contestant {
        height: 300px;
        background-size: 100% !important;
        background-repeat: no-repeat !important;
        background-position: top !important;

        &.winner {
          background-color: rgba(76,175,80, 0.5);
        }

        .name {
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 15px;
          font-size: 30px;
          text-transform: uppercase;
          font-family: 'Avenir', sans-serif;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
