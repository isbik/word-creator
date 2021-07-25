<template>
  <div class="container">
    <div class="task-card">
      <h1>{{ card.name }} {{ wordIndex + 1 }} из {{ words.length }}</h1>
      <p>
        {{ currentWord.name }}
      </p>
      <div class="letters">
        <div
          @click="pickLetter(index, letter)"
          class="letter noselect"
          v-for="(letter, index) in letters"
          :key="index"
        >
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
import { reactive, ref, toRefs } from '@vue/reactivity';
import { computed, onBeforeUnmount, onMounted, watch } from '@vue/runtime-core';
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

export default {
  setup() {
    const card = { name: 'Test' };

    const wordGame = reactive({
      wordIndex: 2,
      pickedLetters: [],
      splittedWord: [],
    });

    const currentWord = computed(() => words[wordGame.wordIndex]);

    const letters = computed(() => wordGame.splittedWord.filter((letter) => letter !== ' '));

    watch(
      () => wordGame.wordIndex,
      () => {
        wordGame.splittedWord = currentWord.value.translate.split('');
        wordGame.pickedLetters = wordGame.splittedWord.map((letter) => {
          return { letter, value: null };
        });
        wordGame.splittedWord = wordGame.splittedWord.filter((letter) => letter !== ' ');
      },
      { immediate: true },
    );

    const handlerKeyUp = ({ key }) => {
      let index = wordGame.splittedWord.findIndex((letter) => letter.toLowerCase() === key);

      if (index === -1) return;

      let letterIndex = wordGame.pickedLetters.findIndex(
        ({ value, letter: l }) => value === null && l !== ' ',
      );

      wordGame.pickedLetters[letterIndex].value = wordGame.splittedWord[index];

      wordGame.splittedWord.splice(index, 1);
    };

    onMounted(() => {
      window.addEventListener('keydown', handlerKeyUp);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handlerKeyUp);
    });

    // functions
    const letterClass = ({ letter, value }) => ({ empty: letter === ' ' });

    const changeWord = (count) => (wordGame.wordIndex += count);

    const pickLetter = (index, letter) => {
      wordGame.splittedWord.splice(index, 1);

      let letterIndex = wordGame.pickedLetters.findIndex(
        ({ value, letter: l }) => value === null && l !== ' ',
      );

      wordGame.pickedLetters[letterIndex].value = letter;
    };

    return {
      words,
      card,
      currentWord,
      changeWord,
      letters,
      letterClass,
      pickLetter,
      ...toRefs(wordGame),
    };
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  background: radial-gradient(#1fe4f5, #3fbafe);
  color: #ffffff;
  margin: 0;
  position: fixed;
  padding: 10px 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
}

.task-card input,
.task-card button {
  margin-top: 20px;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border: none;
  background: rgba(0, 0, 0, 0.25);
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
</style>