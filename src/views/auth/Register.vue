<template>
  <div class="row">
    <div class="col d-flex justify-content-center mt-5">
      <div class="card mb-3">
        <div class="card-body">
          <form @submit.prevent="submit">
            <!-- <fieldset> -->
            <div id="legend">
              <legend class="">Register</legend>
            </div>
            <div class="form-group">
              <!-- Username -->
              <label class="control-label" for="username">Username</label>
              <div class="controls">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder=""
                  v-model="name"
                  class="form-control"
                />
                <div v-if="validation.name" class="mt-2 alert alert-danger">
                  {{ validation.name[0] }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <!-- E-mail -->
              <label class="control-label" for="email">E-mail</label>
              <div class="controls">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder=""
                  v-model="email"
                  class="form-control"
                />
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                  {{ validation.email[0] }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <!-- Password-->
              <label class="control-label" for="password">Password</label>
              <div class="controls">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder=""
                  v-model="password"
                  class="form-control"
                />
                <div v-if="validation.password" class="mt-2 alert alert-danger">
                  Masukkan password
                </div>
              </div>
            </div>

            <div class="form-group">
              <!-- Button -->
              <div class="controls">
                <button class="btn btn-success mt-3">Register</button>
              </div>
            </div>
            <RouterLink to="/" class="d-flex justify-content-end">
              Login
            </RouterLink>
            <!-- </fieldset> -->
          </form>

          <!-- {{ validation }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "Register",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const router = useRouter();
    const validation = ref([]);

    const submit = async () => {
      await axios
        .post("/register", {
          name: name.value,
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          console.log(res);
          // localStorage.setItem("token", response.data.authorisation.token);
          alert("Registrasi berhasil!!");
          name.value = "";
          email.value = "";
          password.value = "";
        })
        .catch((error) => {
          console.log(error);
          validation.value = error.response.data;
        });
    };

    return {
      name,
      email,
      password,

      submit,
      validation,
    };
  },
};
</script>