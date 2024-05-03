<main>

    <div>
        <h1>Welcome {username || "Not Available"}</h1>
        <button on:click={handlePostLogoutWithToasts} class="logout">Logout</button>
      </div>

</main>


<script>

  import { navigate } from "svelte-routing";
  import toast, { Toaster } from "svelte-french-toast";
  import { user } from "../../stores/user.js";
  
  let userid = $user.user.id;
  let username = $user.user.name;

async function postLogout() {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 429) {
      navigate("/RateLimitExceeded");
      return;
    }
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to logout, try again");
    }
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  async function handlePostLogoutWithToasts() {
    await toast.promise(
      postLogout(),
      {
        loading: "Logging out",
        success: "Logged out ",
        error: "Failed to logout - please try again",
      },
      {
        duration: 1500,
        position: "top-center",
      },
    );
  }
</script>


<!-- Future stylling comming in newer releases -->