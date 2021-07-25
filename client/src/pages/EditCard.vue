<template>
  <div class="container mr-10 ml-10">
    <div class="card card-2 edit-card">
      <h1>Edit Card</h1>
      <input v-model="name" type="text" placeholder="Название карточки" />
      <h2>Words for training</h2>

      <div class="words">
        <div class="card card-4 add-word">Add Word</div>
        <div v-for="word in words" :key="word.id" class="card card-5">
          <p>
            {{ word.name }}
          </p>
          <p>
            {{ word.translate }}
          </p>
          <button>Delete</button>
        </div>
        <pre />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const name = ref('');
    const words = [
      {
        id: 123,
        name: 'Моя цель',
        translate: 'My Goal',
      },
      {
        id: 423,
        name: 'Каза',
        translate: 'Goal',
      },
      {
        id: 123,
        name: 'Змея',
        translate: 'snake',
      },
    ];
    return { name, words };
  },
};
</script>

<style lang="scss">
.edit-card {
  margin: 10px;
  h2 {
    margin: 20px 0px;
  }
}
.add-word {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(#04ffa7, #16dcc8);
  }
}
.words {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  grid-gap: 10px;
  align-items: stretch;
  justify-items: stretch;

  .card {
    margin: 0;
  }
  button {
    margin-right: 10px;
  }
}
</style>