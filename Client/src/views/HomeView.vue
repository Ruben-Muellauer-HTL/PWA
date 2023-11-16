<script setup>
import { ref, onMounted } from 'vue';

import axios from 'axios';

import { comparer } from '@/utils/sort.js';

import ButtonGet from '@/components/ButtonGet.vue';
import CardView from '@/components/CardView.vue';

//import employeesData from '@/assets/json/employees';

let employees = ref([]);

let update = ref(false);

const fetchEmployees = async () => {
  const { data } = await axios.get('/employees');
  employees.value = data.sort(({ name: objA }, { name: objB }) => comparer(objA.last, objB.last));
};

const removeEmployee = async (id) => {
  await axios.delete(`/employee/${id}`);
  //fetchEmployees();
};

onMounted(async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('registration failed!');
    return;
  }
  registration.addEventListener('updatefound', () => (update.value = true));
  if (registration.waiting) update.value = true;
});

const refreshSW = async () => {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
  window.location.reload();
};
</script>

<template>
  <div id="app" class="container d-flex flex-column justify-content-center align-items-center mt-3">
    <div class="alert alert-warning w-100" v-if="update" role="alert">
      <p class="text-center">A New Update is available!</p>
      <btn class="btn btn-outline-dark mt-2 d-block mx-auto" @click="refreshSW">Restart Now</btn>
    </div>
    <ButtonGet @getEmployees="fetchEmployees"></ButtonGet>
    <CardView :employees="employees" @remove="removeEmployee"></CardView>
  </div>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Montserrat'), url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

* {
  font-family: 'Montserrat', sans-serif;
}

a {
  text-decoration: none;
}
</style>
