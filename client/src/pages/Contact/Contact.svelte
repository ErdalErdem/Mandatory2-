<script>
    
    import { navigate } from "svelte-routing";
    import toast, { Toaster } from "svelte-french-toast";
    import { BASE_URL } from "../../stores/url.js";
    import  sanitizeHTML from "../../util/sanitize.js";
    import sanitizeEmail from "../../util/sanitize.js";

    let email = "erda0028@stud.kea.dk";
    let subject;
    let message;

    async function postEmail() {
        const sanitizedEmail = sanitizeEmail(email);
        const sanitizedSubject = sanitizeHTML(subject);
        const sanitizedMessage = sanitizeHTML(message);
        const response = await fetch($BASE_URL + "/api/mails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: sanitizedEmail,
                subject: sanitizedSubject,
                message: sanitizedMessage,
            }),
        });
        if (response.ok) {
            try {
                const data = await response.json();
                console.log("Email sent successfully: ", data);
                setTimeout(() => {
                    location.reload();
                }, 2000);
            } catch (e) {
                console.error("Error sending email: ", e);
            }
        } else if (response.status === 429) {
            navigate("/RateLimitExceeded");
        } else {
            console.error("Failed to send email: ", await response.text());
        }
    }

    async function handlePostEmail() {
        await toast.promise(
            postEmail(),
            {
                loading: "Sending email...",
                success: "Email sent successfully",
                error: "Failed to send email - please try again",
            },
            {
                duration: 1500,
                position: "top-center",
            },
        );
    }
</script>

<Toaster />

<main>
    <div class="container">
        <form on:submit|preventDefault={handlePostEmail} class="form">
            <h2>Send Email</h2>

            <label for="email">Email:</label>
            <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="Enter recipient's email"
                required
                readonly
            />

            <label for="subject">Subject:</label>
            <input
                id="subject"
                type="text"
                bind:value={subject}
                placeholder="Subject"
                required
            />

            <label for="message">Message:</label>
            <textarea
                id="message"
                bind:value={message}
                placeholder=" Message"
                required
            ></textarea>

            <button type="submit" class="submit-button">Send Email</button>
        </form>
    </div>
</main>

<style>
   /* Main layout settings */
main {
    background-color: #f7f7f7;  /* Lighter background for better contrast */
    width: 100%;
    padding: 50px;  /* Uniform padding */
    box-sizing: border-box;  /* Include padding and border in the element's width */
    margin: 0 auto;  /* Center main horizontally */
    min-height: 100vh;  /* Full viewport height */
    border-radius: 50px;

}

/* Centered title with more appealing color */
h2 {
    text-align: center;
    color: #333;  /* Darker grey for better readability */
    margin-top: 0;
    padding-top: 20px;
}

/* Container for form and content within it */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #ffffff;  /* Pure white for a clean look */
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Softer shadow */
    max-width: 400px;
    margin: 20px auto;
    border: 1px solid #ddd;  /* Subtle border */
}

/* Styling for form elements */
.form {
    display: flex;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  /* More modern font */
    color: #333;  /* Dark grey text for better readability */
    flex-direction: column;
    width: 100%;
}

.form label {
    margin-bottom: 8px;  /* Slightly more space below labels */
    font-size: 16px;  /* Larger text for better readability */
    color: #555;  /* Softer color */
    text-align: left;
}

.form input,
.form textarea {
    padding: 12px;  /* More padding for better touch interaction */
    margin-bottom: 15px;
    border: 2px solid #ccc;  /* Slightly thicker border */
    border-radius: 4px;
    background: #fefefe;  /* Slightly off-white background */
    color: #333;  /* Consistent text color */
}

/* Specific styles for disabled email input */
#email {
    cursor: not-allowed;
    background-color: #eee;  /* Make disabled fields clearly distinct */
}

/* Textarea specific styles */
.form textarea {
    height: 100px;  /* More space for text */
    font-family: inherit;  /* Ensure consistent font in all form elements */
}

/* Submit button with more modern styling */
.submit-button {
    background-color: #007bff;  /* Bootstrap primary blue */
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;  /* Make button text stand out */
}

.submit-button:hover {
    background-color: #0056b3;  /* Darker blue on hover for a subtle effect */
}

</style>