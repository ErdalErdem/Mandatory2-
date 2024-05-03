
<header>
    <nav class="navbar">

      <ul class="nav-links">
        <button on:click={() => navigateTo('')}>Home</button>
        <button on:click={() => navigateTo('User')}>User</button>
        <button on:click={() => navigateTo('Next Release')}>Next Release</button>
        <button on:click={() => navigateTo('Contact')}>Contact</button>
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

    button {
    background: linear-gradient(45deg, #6a3093, #a044ff);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

  button:hover {
    background: linear-gradient(45deg, #7b1fa2, #ae52d4);
}


  </style>

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