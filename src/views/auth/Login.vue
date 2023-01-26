<template>
  <div class="row">
    <div class="col d-flex justify-content-center mt-5">
      <div class="card mb-3">
        <div class="card-body">
          <form @submit.prevent="submit">
            <!-- <fieldset> -->
            <div id="legend">
              <legend class="">Login</legend>
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
                  {{ validation.password[0] }}
              </div>
              </div>
            </div>

            <div class="form-group">
              <!-- Button -->
              <div class="controls">
                <button class="btn btn-success mt-3">Login</button>
              </div>
            </div>
            <RouterLink to="/register" class="d-flex justify-content-end">
              Register
          </RouterLink>
            <!-- </fieldset> -->
          </form>
         
          
          
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
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
   
    const router = useRouter();
    const validation = ref([])

    const submit = async () => {
      await axios
        .post("/login", {
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          console.log(response.data);
         
          email.value = "";
          password.value = "";

          localStorage.setItem("token", response.data.authorisation.token);
          localStorage.setItem("role",JSON.stringify(response.data.user.role));
          localStorage.setItem("user",JSON.stringify(response.data.user));
          
          let loginType = response.data.user.role
          console.log(loginType);

          if(loginType==='admin'){
             router.push({ path: "/pembayaran" });
          }else if(loginType==='staff'){
            router.push({ path: "/histori" });
          }else if(loginType==='siswa'){
            router.push({ path: "/histori" });
          }

        })
        .catch((error) => {
          console.log(error);
          validation.value = error.response.data
        });
    };

    return {
      email,
      password,
      submit,
      validation,
    };
  },
};
</script>
