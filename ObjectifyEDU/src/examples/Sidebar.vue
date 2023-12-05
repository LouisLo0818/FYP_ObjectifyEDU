<template>
  <div class="sidebar">
    <div class="user-profile">
      <img src="src\assets\img\weblogo.png" alt="Logo" class="avatar" />
      <div class="user-info">
        <span class="ms-2 font-weight-bold me-2">ObjectifyEDU</span>
      </div>
    </div>
    <hr class="horizontal dark mt-0" />
    <ul class="sidebar-menu">
      <li>
        <a href="#">
          <div class="icon-container">
            <i class="bi bi-laptop" style="color: #5e72e4; font-size: 20px"></i>
            <span class="ms-3">Dashboard</span>
          </div>
        </a>
      </li>
      <li><a href="#">Messages</a></li>
      <li><a href="#">Contacts</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    const screenHeight = window.innerHeight;
    console.log(screenHeight);
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.height = `${screenHeight}px`;
  },
};
</script>

<style>
.sidebar {
  top: 0;
  width: 250px;
  background-color: #010101;
  color: #344767;
  padding: 10px;
  height: 1200px;
  margin: 15px 0 15px 15px;
  border-radius: 1em;
  font-family: 14px, Roboto, sans-serif;
  display: inline-block;
  position: sticky;
  top: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 1.2rem;
  margin: 0;
}

.status {
  font-size: 0.8rem;
}

.online {
  color: #4caf50;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
}

.icon-container {
  display: flex;
  align-items: center;
}

.sidebar-menu li {
  margin-bottom: 10px;
  height: 100%;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 5px;
}

.sidebar-menu a {
  text-decoration: none;
  color: #000;
  font-size: 1rem;
}

.sidebar-menu a:hover {
  text-decoration: underline;
}

/* Media query to hide the navigation bar when the screen width is less than 80% */
@media (max-width: 1200px) {
  .sidebar {
    display: none; /* Hide the navigation container */
  }
}
</style>
