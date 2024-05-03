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
 

  
 
  </style>