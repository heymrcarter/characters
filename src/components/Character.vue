<template>
  <div class="character flex-column" :class="{selected}" :style="{'background-image': `url(${character.photo})`}">
    <h2 @mouseover="sayName()">{{ character.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'character',
  data () {
    return {
    }
  },
  props: ['character', 'voice', 'selected'],
  components: { },
  methods: {
    sayName () {
      var utterance = new SpeechSynthesisUtterance(this.character.name)
      utterance.voice = this.voice
      window.speechSynthesis.speak(utterance)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../static/less/common.less';

.character {
  border: solid 3px black;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 60px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  &.selected {
    background-color: #a00;
  }
  &:hover {
    h2 {
      font-size: 50px;
    }
  }
  h2 {
    margin: 0;
    font-size: 30px;
    color: white;
    transition: font-size 0.5s;
    font-family: sans-serif;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 15px;
    border-radius: 5px;
    text-transform: uppercase;
  }
}
</style>
