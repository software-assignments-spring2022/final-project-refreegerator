// Creates location request and display returned data on click
async function locationOnClick() {
    let zipCode = document.getElementById("locationSearchZipCode").value;
    const locations = await getLocations(zipCode);
    displayLocations(locations);
  }
  
  async function getLocations(zipCode) {
    // Use stored access token for location request
    let accessToken = authentication.getAccessToken();
    // Build location URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/locations)
    // Query String (?filter.zipCode.near=term)
    let locationUrl = `${
      config.apiBaseUrl
    }/v1/locations?filter.zipCode.near=${zipCode}`;
    // Location request body
    let locationResponse = await fetch(locationUrl, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    // Return JSON object
    return locationResponse.json();
  }