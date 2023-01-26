<template>
    <div class="row">
        <div class="col">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">Navbar</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
        
                  <div class="collapse navbar-collapse" id="navbarColor02">
                    <ul class="navbar-nav me-auto">
                      <!-- <li class="nav-item">
                        <a class="nav-link active" href="#">Home
                          <span class="visually-hidden">(current)</span>
                        </a>
                      </li> -->
                     
                      <li class="nav-item" >
                      
                        <RouterLink to="/pembayaran" class="nav-link" v-if="pembayaran">Pembayaran<span class="visually-hidden">(current)</span></RouterLink>
                     
                      </li>
                      <li class="nav-item">
                        <RouterLink to="/siswa" class="nav-link"  v-if="siswa"> Siswa </RouterLink>
                      </li>
                      <li class="nav-item">
                          <RouterLink to="/petugas" class="nav-link" v-if="staff"> Petugas </RouterLink>
                      </li>
                      <li class="nav-item">
                        <RouterLink to="/kelas" class="nav-link" v-if="kelas"> Kelas </RouterLink>
                      </li>
                      <li class="nav-item">
                        <RouterLink to="/spp" class="nav-link" v-if="spp">SPP </RouterLink>
                      </li>
                      <li class="nav-item">
                        <RouterLink to="/histori" class="nav-link"  v-if="histori" >History<span class="visually-hidden">(current)</span></RouterLink>
                     </li>
                     
                    </ul>
                    <form class="d-flex">
                     
                      <button class="btn btn-secondary my-2 my-sm-0" @click="Logout">Logout</button>
                    </form>
                  </div>
                </div>
              </nav>
        </div>
        
    </div>
    
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
  setup() {
    const siswa=ref(false);
    const kelas=ref(false);
    const spp=ref(false);
    const staff=ref(false);
    const transaksi=ref(false);
    const histori=ref(false);
    const pembayaran=ref(false);

    let currentUser=JSON.parse(localStorage.getItem('role'));

    if(currentUser==='siswa'){
      histori.value=true
    }else if(currentUser==='staff'){
      histori.value=true;
      pembayaran.value=true;
    }else if(currentUser==='admin'){
     siswa.value=true;
     kelas.value=true;
     spp.value=true;
     staff.value=true;
     transaksi.value=true;
     histori.value=true;
     pembayaran.value=true;
    }


    const router = useRouter();
    const Logout = () => {
      localStorage.clear();
      router.push({ path: '/' });
    };
    return { Logout,
      siswa,
      kelas,
      spp,
      staff,
      transaksi,
      currentUser,
      histori,
      pembayaran
     };
  },
};
</script>