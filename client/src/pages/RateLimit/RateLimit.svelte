<script>
    import { navigate } from 'svelte-routing';
  
    function goHome() {
      navigate('/');
    }
  </script>
  

<div class="unauthorized-container">
    <div class="message">Oops! You have exceeded the ratelimit for using this website please try again later.</div>
    <button on:click={goHome}>Go Back to Homepage</button>
  </div>