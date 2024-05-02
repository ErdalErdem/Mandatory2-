<script>
    import { navigate } from 'svelte-routing';
  
    function goHome() {
      navigate('/');
    }
  </script>
  

<div class="unauthorized-container">
    <div class="message"> Ratelimit exceeded</div>
    <button on:click={goHome}>Go Back to Homepage</button>
  </div>