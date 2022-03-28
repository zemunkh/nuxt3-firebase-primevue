<template>
  <div>
    <Menubar :model="authStore.isLoggedIn ? items : []">
      <template #start>
        <a href="/">
          <img
            alt="logo"
            src="~/assets/images/profile.png"
            height="40"
            class="me-5"
          />
        </a>
        <span class="me-5"><b>{{ store.nick.toUpperCase() }}</b></span>
      </template>
      <template #end>
        <div class="d-flex pe-2 me-2">
          <div class="locale-changer pe-3">
            <select v-model="localeSetting">
              <option
                v-for="lang in availableLocales"
                :key="lang.iso"
                :value="lang.iso"
              >
                {{ lang.flag }} {{ lang.name }} ({{ lang.iso }})
              </option>
            </select>
          </div>
        </div>
        <div v-if="authStore.isLoggedIn" class="d-flex pt-2 pe-5 me-5">
          <!-- Dropdown menu component will be placed here-->
          <!-- <button @click="logout" class="p-button-rounded p-button-outlined"><i class="pi pi-sign-out"></i> </button> -->
        </div>
      </template>
    </Menubar>
    <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
      <h3>Menu</h3>
      <PanelMenu title="hei" :model="adminItems" />
    </Sidebar>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/user";
import { useStore } from "~/store/store";
import { availableLocales } from "~/utils/lang";

const visibleLeft = ref(false);
const items = ref([
  {
    label: "Open Sidebar",
    icon: "pi pi-th-large",
    command: () => {
      visibleLeft.value = true;
    },
  },
  {
    label: "Logout",
    icon: "pi pi-fw pi-power-off",
    command: () => {
      logout();
    },
  },
]);

const adminItems = ref([
  {
    key: "0",
    label: "Admin",
    icon: "pi pi-fw pi-file",
    items: [
      {
        key: "0_0",
        label: "Demo",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            key: "0_0_0",
            label: "Firestore",
            icon: "pi pi-fw pi-bookmark",
            command: () => {
              navigateTo("/admin/demo/firestore");
            },
          },
          {
            key: "0_0_1",
            label: "Products",
            icon: "pi pi-fw pi-pencil",
            command: () => {
              navigateTo("/admin/demo/products");
            },
          },
        ],
      },
      {
        key: "0_1",
        label: "Other",
        icon: "pi pi-fw pi-trash",
      },
    ],
  },
]);

const localeSetting = useState<string>("locale.setting");
const authStore = useAuthStore();
const store = useStore();
const { logoutUser } = authStore;

const logout = () => {
  logoutUser().then((res) => {
    if (res) {
      navigateTo("/login");
    }
  });
};
</script>
