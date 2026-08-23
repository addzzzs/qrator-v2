<script setup>
import { useGlobalStore } from "../store/global";

const { logout, user } = useGlobalStore();
</script>
<template>
  <nav
    class="navbar navbar-expand-lg p-2 bg-primary position-sticky top-0 z-2"
    data-bs-theme="light"
  >
    <div class="container-fluid">
      <a class="navbar-brand text-white" href="#">QRATOR</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul
          class="navbar-nav ms-auto justify-content-center gap-2 align-items-center"
        >
          <li class="nav-item text-white">
            <router-link
              to="/account"
              class="text-decoration-none link-secondary"
            >
              <i class="bi bi-person-circle mx-1"></i>
              {{ user.email }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" @click="logout()" class="btn btn-danger">
              Logout
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
