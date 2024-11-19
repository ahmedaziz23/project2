
async function shortenURL() {
  const urlInput = document.getElementById('url-input').value;
  const resultDiv = document.getElementById('result');

  // Check if URL input is empty
  if (!urlInput) {
    resultDiv.innerHTML = "<span class='error-message'>Please enter a URL to shorten.</span>";
    return;  // Exit the function to avoid further execution
  }

  // API request to TinyURL
  try {
    const response = await fetch(`https://api.tinyurl.com/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN' // Replace with your TinyURL API token
      },
      body: JSON.stringify({
        url: urlInput,
        domain: "tiny.one"
      })
    });

    const data = await response.json();

    // Handle successful URL shortening
    if (data.data) {
      resultDiv.innerHTML = `<span class='success-message'>Shortened URL: <a href="${data.data.tiny_url}" target="_blank">${data.data.tiny_url}</a></span>`;
    } else {
      resultDiv.innerHTML = "<span class='error-message'>Error: Unable to shorten URL.</span>";
    }
  } catch (error) {
    resultDiv.innerHTML = "<span class='error-message'>An error occurred. Please try again.</span>";
  }
}

