<template>
  <div class="container">
    <div class="card card-1">
      <h1>{{ card.name }} {{ wordIndex + 1 }} из {{ words.length }}</h1>
      <p>
        {{ currentWord.name }}
      </p>
      <div class="letters">
        <div class="letter" v-for="(letter, index) in letters" :key="index">
          {{ letter }}
        </div>
      </div>
      <div class="picked-letters">
        <div
          class="letter"
          :class="letterClass(letter)"
          v-for="(letter, index) in pickedLetters"
          :key="index"
        >
          {{ letter.value }}
        </div>
      </div>

      <button style="margin-right: 10px" @click="changeWord(-1)">&lt;</button>
      <button style="margin-right: 10px" @click="changeWord(1)">></button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
export default {
  setup() {
    const card = {
      name: 'Test',
    };

    const wordIndex = ref(2);
    const pickedLetters = ref([]);

    const words = [
      {
        id: 123,
        name: 'Программирование',
        translate: 'Programming',
      },
      {
        id: 13,
        name: 'Мир',
        translate: 'World',
      },
      {
        id: 1234,
        name: 'Я люблю дождь',
        translate: 'I like ranning',
      },
      {
        id: 12,
        name: 'Консервная банка',
        translate: 'Can',
      },
    ];

    const currentWord = computed(() => words[wordIndex.value]);

    const splittedWord = computed(() => currentWord.value.translate.split(''));

    const letters = computed(() => splittedWord.value.filter((letter) => letter !== ' '));

    watch(() => {
      pickedLetters.value = splittedWord.value.map((letter) => {
        return { letter, value: null };
      });
    }, [currentWord]);

    const letterClass = ({ letter, value }) => {
      console.log(letter);
      return {
        empty: letter === ' ',
      };
    };

    const changeWord = (count) => {
      wordIndex.value += count;
    };

    return { words, card, wordIndex, currentWord, changeWord, letters, pickedLetters, letterClass };
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
}
.card {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
}
.card h1 {
  margin-bottom: 10px;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
}

.card__title {
  font-weight: 400;
  color: #ffffff;
}
.letters,
.picked-letters {
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.letters {
  .letter {
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: #1ff57f;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }
}

.picked-letters {
  gap: 5px;

  .letter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #4551fc;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    &.empty {
      background: transparent;
    }
  }
}

.card-1 {
  background: radial-gradient(#1fe4f5, #3fbafe);
}
</style>