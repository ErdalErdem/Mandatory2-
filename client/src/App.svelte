<script>
  import { Router, Route, Link } from 'svelte-routing';
  import { get } from "svelte/store";
  import { onMount } from 'svelte';
  import checkSession from './util/checkSession.js';
  import PrivateRouteGuard from './components/ProtectedRoutes/ProtectedRoutes.svelte';
  import Footer from "./components/Footer/Footer.svelte";
  import Header from "./components/Header/Header.svelte";
  import Home from "./pages/Home/Home.svelte";
  import Unauthorized from './pages/Auth/Auth.svelte';
  import RateLimitExceeded from './pages/RateLimit/RateLimit.svelte';
    import User from './pages/User/User.svelte';

  onMount(async () => {
      await checkSession();
  });

</script>



<main>
  <Header />
  <Router>
    <Route path="/" component={Home} />

    <Route path="/User" component={User}>
      <PrivateRouteGuard>
      </PrivateRouteGuard>

    </Route>
    <Route path="/Unauthorized" component={Unauthorized} />

    <Route path="/RateLimitExceeded" component={RateLimitExceeded} />
  </Router>
  
  <Footer />
</main>