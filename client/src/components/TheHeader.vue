<template>
  <div class="header">
    <ul>
      <li>
        <router-link active-class="active" to="/"> Home </router-link>
      </li>
      <li>
        <router-link active-class="active" to="/cards"> Cards </router-link>
      </li>
      <li>
        <router-link active-class="active" to="/profile"> Profile </router-link>
      </li>
    </ul>

    <button>Login</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: linear-gradient(45deg, #888cf5, #a3d3e5);

  button {
    padding: 5px 10px;
  }

  ul {
    margin-right: auto;
    li {
      display: inline-block;
      a {
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid white;
        margin-right: 20px;
        &.active {
          background: white;
          color: black;
        }
      }
    }
  }
}
</style>