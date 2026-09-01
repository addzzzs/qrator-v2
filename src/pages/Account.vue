<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import api from "@/api";
import { Notyf } from "notyf";
import { useGlobalStore } from "@/store/global";
const { getDetails } = useGlobalStore();
const notyf = new Notyf();
const router = useRouter();

const goBack = () => {
  router.back(); // adjust if your home route isn't "/"
};

// ===== Change Email =====
const newEmail = ref("");
const currentPasswordForEmail = ref("");
const isChangingEmail = ref(false);

const changeEmail = async () => {
  if (!newEmail.value || !currentPasswordForEmail.value) {
    notyf.error("Please fill in all fields");
    return;
  }

  isChangingEmail.value = true;
  try {
    const res = await api.patch("/users/change-email", {
      email: newEmail.value,
      password: currentPasswordForEmail.value,
    });

    if (res.status === 201) {
      notyf.success("Email updated successfully");
      localStorage.setItem("token", res.data.access);
      getDetails();
      newEmail.value = "";
      currentPasswordForEmail.value = "";
    }
  } catch (error) {
    console.log(error.response.data);
    notyf.error(error?.response?.data);
  } finally {
    isChangingEmail.value = false;
  }
};

// ===== Change Password =====
const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const isChangingPassword = ref(false);

const changePassword = async () => {
  if (
    !currentPassword.value ||
    !newPassword.value ||
    !confirmNewPassword.value
  ) {
    notyf.error("Please fill in all fields");
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    notyf.error("New passwords do not match");
    return;
  }

  if (newPassword.value.length < 8) {
    notyf.error("New password must be at least 8 characters");
    return;
  }

  isChangingPassword.value = true;
  try {
    const res = await api.patch("/users/change-pass", {
      current: currentPassword.value,
      password: newPassword.value,
      confirm: confirmNewPassword.value,
    });

    if (res.status === 201) {
      notyf.success("Password updated successfully");
      currentPassword.value = "";
      newPassword.value = "";
      confirmNewPassword.value = "";
    }
  } catch (error) {
    notyf.error(error?.response?.data);
  } finally {
    isChangingPassword.value = false;
  }
};
</script>

<template>
  <Navbar />
  <div class="container py-5">
    <button class="btn btn-outline-primary mb-4" @click="goBack()">
      <i class="bi bi-arrow-left me-1"></i>
      Back to Home
    </button>

    <h4 class="mb-4">Account Settings</h4>

    <!-- Change Email section -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title mb-3">Change Email</h5>
        <form @submit.prevent="changeEmail">
          <div class="mb-3">
            <label for="newEmail" class="form-label">New Email</label>
            <input
              type="email"
              id="newEmail"
              class="form-control"
              v-model="newEmail"
              placeholder="new.email@example.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="currentPasswordForEmail" class="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="currentPasswordForEmail"
              class="form-control"
              v-model="currentPasswordForEmail"
              placeholder="Confirm with your current password"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isChangingEmail"
          >
            {{ isChangingEmail ? "Updating..." : "Update Email" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Change Password section -->
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-3">Change Password</h5>
        <form @submit.prevent="changePassword">
          <div class="mb-3">
            <label for="currentPassword" class="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              class="form-control"
              v-model="currentPassword"
              required
            />
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">New Password</label>
            <input
              type="password"
              id="newPassword"
              class="form-control"
              v-model="newPassword"
              required
            />
          </div>
          <div class="mb-3">
            <label for="confirmNewPassword" class="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              class="form-control"
              v-model="confirmNewPassword"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isChangingPassword"
          >
            {{ isChangingPassword ? "Updating..." : "Update Password" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
