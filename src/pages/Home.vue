<script setup>
import api from "@/api";
import Navbar from "@/components/Navbar.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useGlobalStore } from "@/store/global";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { Notyf } from "notyf";
import DOMPurify from "dompurify";
import { useRouter } from "vue-router";
const notyf = new Notyf();
const artifacts = ref([]);
const isLoading = ref(true);
const isAdding = ref(true);
const url = ref("https://qrator-server.onrender.com/uploads/");
const name = ref("");
const description = ref("");
const image = ref("");
const previewUrl = ref(null);
const artifactId = ref("");
const selecting = ref(false);
const ids = ref([]);
const deleting = ref(false);
const selectedArtifact = ref([]);
const searchKey = ref("");
const router = useRouter();

const getArtifacts = async () => {
  isLoading.value = true;
  try {
    let query = "";
    let params = { searchKey: "" };
    if (!searchKey.value) {
      query = "all";
    } else {
      query = "search";
      params = { searchKey: searchKey.value };
    }
    const res = await api.get(`/artifacts/${query}`, { params });
    console.log(res.data);
    if (res.status == 200) {
      artifacts.value = res.data.artifacts;
    }
  } catch (error) {
    console.log(error.response.data);
  } finally {
    isLoading.value = false;
  }
};
const reset = () => {
  name.value = "";
  description.value = "";
  image.value = "";
  isAdding.value = true;
  artifactId.value = "";
  previewUrl.value = "";
  deleting.value = false;
};

const addArtifact = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("image", image.value);

    const res = await api.post("/artifacts/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status == 201) {
      getArtifacts();
      reset();
      notyf.success("Artifact added successfully");
    }
  } catch (error) {
    console.log(error.response.data);
    notyf.error("Artifact added failed");
  } finally {
    isLoading.value = false;
  }
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

function openEdit(artName, artDescription, artImage, id) {
  deleting.value = false;
  isAdding.value = false;
  artifactId.value = id;
  name.value = artName;
  description.value = artDescription;
  image.value = "";
  previewUrl.value = url.value + artImage;
}

const updateArtifact = async () => {
  isLoading.value = true;
  try {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("description", description.value);

    if (image.value) {
      formData.append("image", image.value);
    }

    const res = await api.patch(
      `/artifacts/update/${artifactId.value}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    if (res.status == 201) {
      getArtifacts();
      reset();
      notyf.success("Artifact updated successfully");
    }
  } catch (error) {
    console.log(error.response.data);
    notyf.error("Artifact update failed");
  } finally {
    isLoading.value = false;
  }
};

function openDelete(id, artName) {
  artifactId.value = id;
  name.value = artName;
  deleting.value = true;
}

const deleteArtifact = async () => {
  try {
    const res = await api.delete(`/artifacts/delete/${artifactId.value}`);

    if (res.status == 200) {
      getArtifacts();
      reset();
      notyf.success("Artifact DeletedSuccessfully");
    }
  } catch (error) {
    console.log(error?.response?.data?.error);
    notyf.error("Artifact delete failed");
  }
};

function openSelect() {
  selecting.value = true;
}

function closeSelect() {
  selectedArtifact.value = [];
  selecting.value = false;
}

const isSelected = (id) =>
  selectedArtifact.value.some((item) => item.id === id);

const selectArtifact = (id, name) => {
  const index = selectedArtifact.value.findIndex((item) => item.id === id);

  if (index === -1) {
    selectedArtifact.value.push({ id: id, name: name });
  } else {
    selectedArtifact.value.splice(index, 1);
  }

  console.log(selectedArtifact.value);
};

const generateQR = async (artifacts) => {
  isLoading.value = true;
  try {
    const res = await api.post(
      "/artifacts/generateQr",
      {
        artifacts: artifacts,
      },
      { responseType: "blob" },
    );

    const blob = new Blob([res.data], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "artifact-qr.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);

    notyf.success("QR Generated Successfully");
  } catch (error) {
    notyf.error(error.response.data.error);
  } finally {
    isLoading.value = false;
  }
};
const selectedAll = computed(
  () => artifacts.value.length === selectedArtifact.value.length,
);
const selectAll = () => {
  selectedArtifact.value = [];
  artifacts.value.forEach((artifact) => {
    selectedArtifact.value.push({ id: artifact._id, name: artifact.name });
  });

  console.log(selectedArtifact.value);
};

const unselectAll = () => {
  selectedArtifact.value = [];
};

let debounceTimer = null;

watch(searchKey, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    getArtifacts();
  }, 400);
});

const { getDetails } = useGlobalStore();

onBeforeMount(async () => {
  const authorized = await getDetails();

  if (!authorized || !localStorage.getItem("token")) {
    router.push("/login");
  } else {
    getArtifacts();
  }
});
</script>
<template>
  <Navbar />
  <div class="container py-5">
    <div class="d-flex flex-column flex-md-row justify-content-between mb-2">
      <h4 class="">Artifacts</h4>
      <div class="row gap-2 justify-content-center">
        <button
          class="btn col-5 mb-2 col-md text-nowrap btn-primary"
          @click="reset()"
          data-bs-toggle="modal"
          data-bs-target="#openModal"
        >
          Add Artifact
        </button>
        <button
          v-if="!selecting"
          class="btn col-5 mb-2 col-md text-nowrap btn-outline-primary"
          @click="openSelect()"
        >
          Select Artifact
        </button>

        <button
          v-if="selecting && !selectedAll"
          class="btn col-5 mb-2 col-md text-nowrap btn-outline-success"
          @click="selectAll()"
        >
          Select All
        </button>

        <button
          v-if="selecting && selectedAll"
          class="btn col-5 mb-2 col-md text-nowrap btn-outline-success"
          @click="unselectAll()"
        >
          Unselect All
        </button>
        <button
          v-if="selecting"
          class="btn col-5 mb-2 col-md text-nowrap btn-success"
          @click="generateQR(selectedArtifact)"
        >
          Generate QR
        </button>

        <button
          v-if="selecting"
          class="btn col-5 mb-2 col-md text-nowrap btn-secondary"
          @click="closeSelect()"
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="row justify-content-end mb-3">
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping"
          ><i class="bi bi-search"></i
        ></span>
        <input
          type="text"
          class="form-control"
          placeholder="Artifact Name"
          aria-label="searchKey"
          aria-describedby="addon-wrapping"
          v-model="searchKey"
        />
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      Loading Artifacts...
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <p v-if="!artifacts.length && !isLoading" class="text-center text-muted">
      No Artifacts Available
    </p>

    <div v-else class="row">
      <div v-for="artifact in artifacts" class="col-12 col-md-6 col-lg-3 mb-2">
        <div class="card shadow-sm position-relative">
          <input
            v-if="selecting"
            type="checkbox"
            :checked="isSelected(artifact._id)"
            @change="selectArtifact(artifact._id, artifact.name)"
            class="form-check form-check-inline position-absolute end-0 me-2"
          />
          <img
            :src="url + artifact.image"
            class="card-img-top img-fluid"
            style="height: 300px"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ artifact.name }}</h5>
            <p
              class="card-text overflow-hidden"
              style="height: 50px"
              v-html="DOMPurify.sanitize(artifact.description.slice(0, 111))"
            ></p>
            <div class="dropdown d-flex justify-content-end">
              <button
                class="btn btn-sm btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link
                    :to="`/artifact/${artifact._id}`"
                    class="dropdown-item"
                    >View</router-link
                  >
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="
                      openEdit(
                        artifact.name,
                        artifact.description,
                        artifact.image,
                        artifact._id,
                      )
                    "
                    data-bs-toggle="modal"
                    data-bs-target="#openModal"
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item text-danger"
                    @click="openDelete(artifact._id, artifact.name)"
                    data-bs-toggle="modal"
                    data-bs-target="#openModal"
                  >
                    Delete
                  </button>
                </li>
                <li>
                  <button
                    class="dropdown-item"
                    @click="
                      generateQR([{ id: artifact._id, name: artifact.name }])
                    "
                  >
                    Generate QR
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="openModal"
    tabindex="-1"
    aria-labelledby="openModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="!deleting" class="modal-title fs-5" id="openModalLabel">
            {{ isAdding ? "Add" : "Update" }} Artifact
          </h1>
          <h1 v-else class="modal-title fs-5 text-danger" id="openModalLabel">
            Delete Artifact
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form v-if="!deleting" enctype="multipart/form-data">
            <div class="form-group">
              <label for="image" class="image-upload-label">
                <img
                  v-if="previewUrl"
                  :src="previewUrl"
                  class="preview-img"
                  alt="Preview"
                />
                <div v-else class="placeholder-content">
                  <span class="plus-icon">+</span>
                  <span class="upload-text">Upload Image</span>
                </div>
                <input
                  type="file"
                  id="image"
                  class="form-control-file"
                  name="uploaded_file"
                  accept="image/*"
                  @change="handleFileChange"
                  hidden
                />
              </label>

              <div class="mb-3">
                <label for="name" class="form-label">Artifact Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  v-model="name"
                />
              </div>

              <label for="description" class="form-label"
                >Artifact Description</label
              >
              <div class="mb-3">
                <QuillEditor
                  :key="artifactId || 'new'"
                  v-model:content="description"
                  contentType="html"
                  theme="snow"
                />
              </div>
            </div>
          </form>

          <div v-else>
            <p>
              Are you sure you want to delete
              <span class="fw-bold">{{ name }}</span
              >?
            </p>
            <div
              class="alert alert-danger d-flex align-items-start"
              role="alert"
            >
              <i class="bi bi-exclamation-triangle-fill me-2 mt-1"></i>
              <div>
                This action is <strong>permanent</strong> and cannot be undone.
                The artifact and its image will be removed from the system.
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            v-if="!deleting"
            data-bs-dismiss="modal"
            type="button"
            @click="isAdding ? addArtifact() : updateArtifact()"
            class="btn btn-primary"
          >
            {{ isAdding ? "Save" : "Update" }} Artifact
          </button>
          <button
            v-else
            data-bs-dismiss="modal"
            type="button"
            @click="deleteArtifact()"
            class="btn btn-danger"
          >
            Delete Artifact
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  background-color: #fafafa;
  margin-bottom: 1rem;
}

.image-upload-label:hover {
  border-color: #999;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}

.plus-icon {
  font-size: 2rem;
  line-height: 1;
}

.upload-text {
  font-size: 0.8rem;
  margin-top: 4px;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
