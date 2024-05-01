<script>
    import { navigate } from 'svelte-routing';
  
    function goHome() {
      navigate('/');
    }
  </script>

<div class="unauthorized-container">
    <div class="message">Oops! You are not authorized to view this page.</div>
    <button on:click={goHome}>Go Back to Homepage</button>
  </div> 