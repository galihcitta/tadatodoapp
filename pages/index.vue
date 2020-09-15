<template>
  <section class="container">
    <h1 class="title">todotada</h1>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input :checked="todo.done" @change="update(todo)" type="checkbox" />
        <span :class="{ done: todo.done }">{{ todo.text }} {{ getStringFromDate(todo.created) }}</span>
        <button @click="removeTodo(todo)">remove</button>
      </li>
    </ul>
    <p>
      <input
        :value="todoText"
        @input="todoText = $event.target.value"
        placeholder="✨What needs to be done?"
      />
      <button @click="addTodo">add</button>
    </p>
    <p>
      <input
        :value="searchText"
        @input="searchText = $event.target.value"
        placeholder="🔍Search your todo."
      />
    </p>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      todoText: '',
      searchText: ''
    }
  },
  computed: {
    todos() {
      if (this.searchText.length > 0) {
        return this.$store.state.todos.list.filter((item) =>
          item.text.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      return this.$store.state.todos.list;
    }
  },
  methods: {
    addTodo() {
      this.$store.commit("todos/add", this.todoText);
      this.todoText = "";
    },
    ...mapMutations({
      update: "todos/update",
    }),
    removeTodo(todo) {
      this.$store.commit("todos/remove", todo);
    },
    getStringFromDate(date) {
      return (
        date.getFullYear() +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2) +
        " " +
        ("00" + date.getHours()).slice(-2) +
        ":" +
        ("00" + date.getMinutes()).slice(-2) +
        ":" +
        ("00" + date.getSeconds()).slice(-2)
      );
    },
  }
}
</script>

<style>
</style>
