<template>
  <div class="container">
    <div class="cards">
      <div class="card card-4">
        <h3>Добавить карточку</h3>
        <input v-model="name" placeholder="Название карточки" type="text" />
        <button @click="createCard">Добавить</button>
      </div>
      <div v-for="card in cards" :key="card.id" class="card card-3">
        <h2 class="card__title">{{ card.name }} ({{ card.words }})</h2>

        <p class="card__apply">
          <router-link :to="`/card/${card.id}`">
            <button>Тренировать</button>
          </router-link>
          <router-link :to="`/card/${card.id}/edit`">
            <button>Редактировать</button>
          </router-link>
          <button>Удалить</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const cards = ref([
      {
        id: 1,
        name: 'English words',
        words: 10,
      },
      {
        id: 2,
        name: 'English animal words',
        words: 5,
      },
    ]);

    const name = ref('');

    const createCard = () => {
      cards.value.unshift({
        id: Date.now(),
        name: name.value,
        words: Math.floor(Math.random() * 10),
      });
      name.value = '';
    };
    return {
      name,
      cards,
      createCard,
    };
  },
};
</script>

<style lang="scss">
.cards {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  grid-gap: 20px;
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