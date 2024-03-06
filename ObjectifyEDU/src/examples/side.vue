<template>
  <div class="sidebar-container">
    <div class="nav-header">
      <h1 class="nav-title">
        <img src="../../src/assets/img/logo.png" alt="Logo" style="width: 100px;" />
      </h1>
    </div>
    <ul class="sidebar-items">
      <router-link to="/Dashboard" class="path-title">
        <li :class="sidebarItemClass('/Dashboard')">
          <i class="bx bx-home path-icon"></i>
          <span>Dashboard</span>
        </li>
      </router-link>
      <router-link to="/courses" class="path-title">
        <li :class="sidebarItemClass('/courses')">
          <i class="bx bx-bookmark path-icon"></i>
          <span>Courses</span>
        </li>
      </router-link>
      <a href="#" class="path-title">
        <li :class="sidebarItemClass('/schedule')">
          <i class="bx bx-calendar path-icon"></i>
          <span>Schedule</span>
        </li>
      </a>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    currentPath() {
      return this.$route.path;
    },
  },
  methods: {
    sidebarItemClass(routePath) {
      if (this.currentPath.startsWith('/courses') || this.currentPath.startsWith('/Courses')) {
        return {
          'path-link': true,
          'sidebar-location': routePath.startsWith('/courses'),
          'non-sidebar-location': !routePath.startsWith('/courses'),
        };
      } else {
        return {
          'path-link': true,
          'sidebar-location': this.currentPath === routePath,
          'non-sidebar-location': this.currentPath !== routePath,
        };
      }
    },
  },
};
</script>

<style>
.sidebar-container {
  width: 260px;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  color: #dbdbeb;
  margin: 0;
}

.sidebar-items {
  color: #dbdbeb;
  height: 60%;
  list-style: none;
  padding: 0 15px;
}

.sidebar-items li {
  height: 44px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sidebar-location {
  background-color: #e7e7ff;
}

.non-sidebar-location:hover {
  background-color: #fafbfb;
}

@media screen and (max-width: 1300px) {
  .sidebar-container {
    display: none;
  }
}

.path-icon {
  margin-inline-end: 0.625rem;
  font-size: 20px;
}

.path-title {
  text-decoration: none;
  font-size: 20px;
  color: #696cff;
}

.path-link {
  display: flex;
  align-items: center;
  padding: 15px;
}
</style>
