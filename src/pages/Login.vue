<script setup>
import { ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import api from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref("");
const password = ref("");
const notyf = new Notyf();
const isLoading = ref(false);
const invalidEmail = ref(false);
const invalidPassword = ref(false);

const validate = (status) => {
  if (email.value.trim() == "" || status == 404) {
    invalidEmail.value = true;
  } else {
    invalidEmail.value = false;
  }

  if (password.value.trim() == "" || status == 401) {
    invalidPassword.value = true;
  } else {
    invalidPassword.value = false;
  }

  if (invalidEmail.value || invalidPassword.value) {
    return false;
  } else {
    return true;
  }
};
const login = async () => {
  isLoading.value = true;

  try {
    if (!validate()) {
      return;
    }
    const body = {
      email: email.value,
      password: password.value,
    };
    const res = await api.post("/users/login", body);

    console.log(res);
    if (res.status == 200) {
      email.value = "";
      password.value = "";
      localStorage.setItem("token", res.data.access);
      notyf.success("Login Successfully");
      router.push("/");
    }
  } catch (error) {
    console.log(error.response);
    validate(error.response.status);
    notyf.error(error.response.data.error);
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.push("/");
  }
});
</script>
<template>
  <main class="container pt-5">
    <div class="row h-100 justify-content-center pt-5 mt-3">
      <div class="col-12 col-lg-6">
        <form
          @submit.prevent="login"
          class="bg-white shadow-lg p-4 p-md-5 rounded-4"
        >
          <fieldset>
            <h1 class="text-center">Login</h1>

            <div>
              <label for="email" class="form-label mt-4">Email address</label>
              <input
                type="email"
                :class="
                  invalidEmail ? 'form-control is-invalid' : 'form-control'
                "
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div>
              <label for="password" class="form-label mt-4">Password</label>
              <input
                type="password"
                :class="
                  invalidPassword ? 'form-control is-invalid' : 'form-control'
                "
                id="password"
                placeholder="Enter Password"
                autocomplete="off"
                v-model="password"
              />
            </div>

            <button
              v-if="!isLoading"
              type="submit"
              class="btn btn-primary mt-4 rounded px-5"
            >
              Login
            </button>

            <button
              v-else
              type="button"
              class="btn btn-primary mt-4 rounded px-5"
            >
              Loging in...
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </main>
</template>
