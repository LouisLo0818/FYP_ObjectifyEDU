<template>
  <sidebar />
  <!-- <nav
    class="navbar navbar-expand-lg bg-light"
    style="width: 90%; margin: 0 auto;height: 50px;position: relative;top: 30px;">
    <div class="container-fluid">
      <nav aria-label="breadcrumb" style="margin: auto 0;">
        <ol class="breadcrumb" style="height: 10px">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
        <h6 style="height: 10px;">Dashboard</h6>
      </nav>
      <div class="collapse navbar-collapse" id="navbarNavDropdown" style="position: relative;left: 10vw;">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
  <div class="nav-container">
    <nav aria-label="breadcrumb" style="
        display: flex;
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
        margin: auto 0;
      ">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="text-decoration: none">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
      </ol>
    </nav>
    <div class="nav-func-container">
      <ul class="nav-func">
        <li>
          <button>
            <i class="bi bi-list"></i>
          </button>
        </li>
        <li>
          <button>
            <i class="bi bi-gear-fill"></i>
          </button>
        </li>
        <li>
          <button>
            <i class="bi bi-bell-fill"></i>
          </button>
        </li>
        <!-- <li><i class="bi bi-x-lg"></i></li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    const screenHeight = window.innerHeight;
    const sidebar = document.querySelector("main");
    sidebar.style.height = `${screenHeight}px`;
  },
};
</script>
<style>
main {
  width: 100%;
  background: linear-gradient(to bottom, #2dce89 45%, #ffffff 30%);
}

.nav-container {
  position: relative;
  top: 30px;
  display: flex;
  margin: 0 auto;
  /* Set the left and right margins to 'auto' */
  top: 20px;
  width: 90%;
  /* You can adjust the width as needed */
  background-color: #ffffff;
  height: auto;
}

.nav-items {
  width: 200px;
  margin: auto 0;
}

.nav-link {
  color: white;
  /* Add your desired text color */
  text-decoration: none;
}

.nav-func-container {
  width: 80%;
  margin: auto 0;
  text-align: right;
}

.nav-func {
  list-style-type: none;
}

.nav-func li {
  display: inline-block;
  /* Display the list items in the same line */
  margin-right: 10px;
  /* Add spacing between list items (adjust as needed) */
}

button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
