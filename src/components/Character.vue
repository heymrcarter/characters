<template>
  <div class="character flex-column" :class="backgroundTint()" :style="{'background-image': `url(${character.photo})`}">
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
  props: ['character', 'voice', 'bgTint'],
  methods: {
    sayName () {
      var utterance = new SpeechSynthesisUtterance(this.character.name)
      utterance.voice = this.voice
      window.speechSynthesis.speak(utterance)
    },
    backgroundTint () {
      const classObj = {}
      classObj[this.bgTint] = true

      return classObj
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../static/less/common.less';

.character {
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 60px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  &.blue-tint {
    background-color: rgba(33,150,243, 1);
  }
  &.red-tint {
    background-color: rgba(244,67,54, 1);
  }
  &.green-tint {
    background-color: rgba(76,175,80, 1);
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
