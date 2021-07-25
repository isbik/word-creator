<template>
  <div class="task-card">
    <div class="container">
      <div class="header-task">
        <router-link to="/">
          <button>x</button>
        </router-link>
        <div class="progress">
          <span class="progress-bar" :style="`width: ${width}%`" />
        </div>
        <p>{{ wordIndex + 1 }} из {{ words.length }}</p>
      </div>
      <h1>{{ card.name }}</h1>
      <p>
        {{ currentWord.name }}
      </p>
      <div class="letters">
        <div
          v-for="(letter, index) in letters"
          :key="index"
          class="letter noselect"
          @click="pickLetter(index, letter)"
        >
          {{ letter }}
        </div>
      </div>
      <div class="picked-letters">
        <div
          v-for="(letter, index) in pickedLetters"
          :key="index"
          class="letter"
          :class="letterClass(letter)"
          @click="removeLetter(index, letter)"
        >
          {{ letter.value }}
        </div>
      </div>

      <button style="margin-right: 10px" @click="resetWord">Сбросить</button>
      <button style="margin-right: 10px" @click="checkWord">Проверить</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
import { shuffle } from '../lib/array';
import useWindowEvent from '../hooks/useWindowEvent';
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
      wordIndex: 0,
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
        wordGame.splittedWord = shuffle(wordGame.splittedWord.filter((letter) => letter !== ' '));
      },
      { immediate: true },
    );

    // functions
    const letterClass = ({ letter }) => ({ empty: letter === ' ' });

    const changeWord = (count) => {
      let index = wordGame.wordIndex + count;

      if (!words[index]) return;
      wordGame.wordIndex = index;
    };

    const pickLetter = (index, letter) => {
      wordGame.splittedWord.splice(index, 1);

      let letterIndex = wordGame.pickedLetters.findIndex(
        ({ value, letter: l }) => value === null && l !== ' ',
      );

      wordGame.pickedLetters[letterIndex].value = letter;
    };

    const removeLetter = (index, { value }) => {
      if (!value) return;
      wordGame.pickedLetters[index].value = null;
      wordGame.splittedWord.push(value);
    };

    const resetWord = () => {
      wordGame.pickedLetters.forEach(({ value }, index) => {
        if (!value) return;
        wordGame.splittedWord.push(value);

        wordGame.pickedLetters[index].value = null;
      });
    };
    const checkWord = () => {
      let resultWord = wordGame.pickedLetters
        .map(({ value }) => value)
        .join('')
        .toLowerCase();

      let targetWord = currentWord.value.translate
        .split('')
        .filter((v) => v !== ' ')
        .join('')
        .toLowerCase();

      if (resultWord === targetWord) {
        alert('УРА');
      }
      changeWord(1);
    };

    const width = computed(() => {
      return ((wordGame.wordIndex + 1) * 100) / words.length;
    });

    useWindowEvent('keydown', ({ key }) => {
      let index = wordGame.splittedWord.findIndex((letter) => letter.toLowerCase() === key);

      if (key === 'Backspace') {
        let lastLetterIndex = -1;

        wordGame.pickedLetters.forEach(({ value }, index) => {
          if (value) lastLetterIndex = index;
          else return;
        });

        if (lastLetterIndex === -1) return;

        wordGame.splittedWord.push(wordGame.pickedLetters[lastLetterIndex].value);
        wordGame.pickedLetters[lastLetterIndex].value = null;
      }

      if (key === 'Enter') {
        checkWord();
      }

      if (index === -1) return;

      let letterIndex = wordGame.pickedLetters.findIndex(
        ({ value, letter: l }) => value === null && l !== ' ',
      );

      wordGame.pickedLetters[letterIndex].value = wordGame.splittedWord[index];

      wordGame.splittedWord.splice(index, 1);
    });

    return {
      words,
      card,
      currentWord,
      changeWord,
      letters,
      letterClass,
      pickLetter,
      width,
      removeLetter,
      resetWord,
      checkWord,
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
    width: 40px;
    height: 40px;
    background: #1ff57f;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  }
}

.picked-letters {
  gap: 5px;

  .letter {
    border-radius: 10px;

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
.header-task {
  button {
    margin: 0 20px 0 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-left: 20px;
    white-space: nowrap;
    word-break: normal;
  }
}
.progress {
  width: 100%;
  height: 10px;
  background: #e1e4e8;
  border-radius: 5px;
  overflow: hidden;
}
.progress .progress-bar {
  display: block;
  height: 100%;
  background: #b34bff;
  transition: all 0.2s;
}
</style>