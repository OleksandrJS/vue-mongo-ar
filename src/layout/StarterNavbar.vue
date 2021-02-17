<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Mega-Auto
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          MegaAuto
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <div
        class="nav-link btn btn-neutral"
        target="_blank"
        @click="openModal()"
      >
        <i class="now-ui-icons users_circle-08"></i>
        <p class="ml-2">Login</p>
      </div>
    </template>
  </navbar>
</template>

<script>
import { Navbar } from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
    openModal: Function,
  },
  components: {
    Navbar,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped></style>
