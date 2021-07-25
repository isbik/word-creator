<template>
  <div class="container">
    <div class="card card-2">
      <h3>Добавить карточку</h3>
      <input v-model="name" placeholder="Название карточки" type="text" />
      <button @click="createCard">Добавить</button>
    </div>
    <div class="card card-1" v-for="card in cards" :key="card.id">
      <h2 class="card__title">{{ card.name }} ({{ card.words }})</h2>

      <p class="card__apply">
        <router-link :to="`/card/${card.id}`">
          <button>Тренировать</button>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
export default {
  setup() {
    const name = ref('');
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

    const createCard = () => {
      cards.value.unshift({
        id: Date.now(),
        name: name.value,
        words: Math.floor(Math.random() * 10),
      });
      name.value = '';
    };

    return {
      cards,
      name,
      createCard,
    };
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

a,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

.card {
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
  color: #ffffff;
  margin: 20px 0;
}

.card input,
.card button {
  margin-top: 20px;
  color: white;
  border-radius: 10px;
  padding: 10px 20px;
  border: none;
  background: rgba(0, 0, 0, 0.25);
}
.card input {
  padding: 10px;
  width: 100%;
}
.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
}

.card-1 {
  background: radial-gradient(#1fe4f5, #3fbafe);
}

.card-2 {
  background: radial-gradient(#fbc1cc, #fa99b2);
}

.card-3 {
  background: radial-gradient(#76b2fe, #b69efe);
}

.card-4 {
  background: radial-gradient(#60efbc, #58d5c9);
}

.card-5 {
  background: radial-gradient(#f588d8, #c0a3e5);
}
</style>