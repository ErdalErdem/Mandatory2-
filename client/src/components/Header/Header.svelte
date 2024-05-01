<script>
    import { navigate } from "svelte-routing";
  
    async function navigateTo(route) {
      try {
        const response = await fetch(`/${route}`);
  
        if (response.ok) {
          navigate(`/${route}`);
        } else if (response.status === 429) {
          navigate('/RateLimitExceeded');
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  </script>

  
<header>
    <nav class="navbar">

      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <style>
    header {
      background: url('/header-bg.jpg') no-repeat center center / cover;
      padding: 1rem 2rem;
      color: white;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      list-style: none;
      display: flex;
    }
    .nav-links li {
      padding: 0 15px;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }

  </style>