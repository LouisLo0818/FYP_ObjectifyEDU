<template>
  <div class="nav-container">
    <nav>
      <a href="#" style="text-decoration: none; display: inline; margin-left: 20px;">Home</a>
      <h6 style="display: inline">&nbsp;/ {{ pageTitle }}</h6>
    </nav>
    <button class="menu-button" style="margin-right: 10px;" @click="toggleSidebar">
      <i class="bi bi-list" style="font-size: 24px;"></i>
    </button>
    <div class="dropdown" @click="toggleDropdown">
      <button class="dropbtn">
        <img src="../../src/assets/img/dog.png" alt="Avatar" class="avatar" />
      </button>
      <div class="dropdown-content" v-show="isOpen">
        <a href="#" style="margin-top: 5px;"><i class="bi bi-person"></i> &nbsp; Profile</a>
        <a href="#"><i class="bi bi-gear"></i> &nbsp; Settings</a>
        <a href="#" @click="logout"><i class="bi bi-box-arrow-left"></i> &nbsp; Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // dropdown menu is closed by default
      showSideBar: true,
    };
  },
  computed: {
    pageTitle() {
      // Access the current route's path from $route
      const currentPath = this.$route.path;

      // Use conditional logic to set the page title based on the route
      if (currentPath === "/Dashboard") {
        return "Dashbord";
      } else if (currentPath === "/courses") {
        return "Courses";
      } else if (currentPath.startsWith("/Courses/Games")) {
        return "Courses/Games";
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    toggleSidebar() {
      this.showSideBar = !this.showSideBar;
    },
    logout() {
      console.log("logout");
      console.log(localStorage.getItem("user"));
      localStorage.removeItem("user");
      console.log(localStorage.getItem("user"));
      location.assign("/");
    },
  },
};
</script>

<style>
.nav-container {
  display: flex;
  align-items: center;
  position: relative;
  top: 20px;
  margin: 0 auto;
  background-color: #fefefe;
  width: 95%;
  height: 64px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.menu-button {
  background-color: transparent;
  border: none;
  color: #4c5f71;
  margin-left: auto;
}

.menu-button:hover {
  background-color: #f7f7f8;
  border-radius: 100%;
  /* Make it a circle */
}

.dropdown {
  position: relative;
  display: inline-block;
}

/* Style the dropdown button */
.dropbtn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

/* Style the dropdown content (hidden by default) */
.dropdown-content {
  display: block;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fefefe;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 8px;
  /* Add border-radius to the dropdown menu */
  height: 155px;
}

/* Style the dropdown items */
.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  color: #4c5f71;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f7f7f8;
}

.avatar {
  width: 40px;
  height: 40px;
}
</style>
