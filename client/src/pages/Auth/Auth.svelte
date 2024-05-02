<script>
    import { navigate } from 'svelte-routing';
  
    function goHome() {
      navigate('/');
    }
  </script>

<div class="unauthorized-container">
    <div class="message">Not authorized</div>
    <button on:click={goHome}>Return to homepage</button>
  </div> 