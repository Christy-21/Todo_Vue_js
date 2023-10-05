<script setup>
import { Icon } from "@iconify/vue";
import { uid } from "uid";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import KonvaCanvas from "../components/KonvaCanvas.vue";
import TodoCreator from "../components/TodoCreator.vue";
import TodoItem from "../components/TodoItem.vue";

const router = useRouter();
const todoList = ref([]);
const idleTimeout = 1000000; // 15 seconds of inactivity
let timer = null;

const todosCompleted = computed(() => {
  return todoList.value.every((todo) => todo.isCompleted);
});

const fetchTodoList = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (savedTodoList) {
    todoList.value = savedTodoList;
  }
};

// Fetch Todo's on page load
fetchTodoList();

const setTodoListLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

const createTodo = (todo) => {
  todoList.value.push({
    id: uid(),
    todo,
    isCompleted: false,
    isEditing: null,
  });
  setTodoListLocalStorage();
};

const toggleEditTodo = (todoPos) => {
  todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
  setTodoListLocalStorage();
};

const updateTodo = (todoVal, todoPos) => {
  todoList.value[todoPos].todo = todoVal;
  setTodoListLocalStorage();
};

const toggleTodoComplete = (todoPos) => {
  todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted;
  setTodoListLocalStorage();
};

const deleteTodo = (todo) => {
  todoList.value = todoList.value.filter(
    (todoFilter) => todoFilter.id !== todo.id
  );
  setTodoListLocalStorage();
};

const resetTimer = () => {
  clearTimeout(timer);
  timer = setTimeout(logout, idleTimeout);
};

const logout = () => {
  // Redirect to the login page
  router.push('/');
};

watch(todoList, resetTimer, { deep: true });

// Start the initial timer and listen for mousemove events
resetTimer();
window.addEventListener("mousemove", resetTimer);
</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <ul class="username-list">
      <li v-for="username in usernameList" :key="username">{{ username }}</li>
    </ul>
    <TodoCreator @create-todo="createTodo">
      <template #button-content>Create</template>
    </TodoCreator>
    <KonvaCanvas @rectangle-drawn="addUsernameToTodoList" />
    <ul class="todo-list" v-if= " todoList.length > 0">
      <TodoItem
        v-for="(todo, index) in todoList"
        :todo="todo"
        :index="index"
        @edit-todo="toggleEditTodo"
        @update-todo="updateTodo"
        @toggle-complete="toggleTodoComplete"
        @delete-todo="deleteTodo"
      />
    </ul>
    <p v-else class="todos-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" />
      <span>You have no todos to complete! Add one!</span>
    </p>
    <p v-if="todosCompleted && todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your todos!</span>
    </p>
  </main>
</template>

<script>

import KonvaCanvas from "../components/KonvaCanvas.vue";
import { mapState } from "vuex";

export default {
  components: {
    KonvaCanvas,
  },
  data() {
    return {
      usernameList: [],
    };
  },
  computed: {
    ...mapState({
      formData: (state) => state.formData,
    }),
  },
  methods: {
    createTodo() {
      const todo = this.username;
      this.usernameList.push(todo);
    },
    addUsernameToTodoList(username) {
      this.todoList.push({
        id: uid(),
        todo: username,
        isCompleted: false,
        isEditing: null,
      });
    },
  },
};
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .username-list {
    list-style: none;
    padding: 0;
  }

  .username-list li {
    margin-bottom: 8px;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 20px;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>