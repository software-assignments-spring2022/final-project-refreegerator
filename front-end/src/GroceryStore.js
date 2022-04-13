// Product request
import location from "Location.js"

const fs = require('fs');


async function getProducts(item) {
    // Use access stored access token for product request
    let accessToken = authentication.getAccessToken();
    // Use stored locationId
    let locationId = localStorage.getItem("locationId");
  
    // Use locationId as filter (if) selected by user
    let searchByLocation = "";
    if (locationId) {
      searchByLocation = `filter.locationId=${locationId}&`;
    }
    
    //url for product call
    let productsURL = `${
      config.apiBaseUrl
    }/v1/products?${searchByLocation}filter.term=${item}`;
  
    // requesting product
    let productsResponse = await fetch(productsURL, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  
    // Return json object
    console.log(productsResponse.json());
    var jsonData = JSON.stringify(productsResponse.json())
    fs.writeFile('GSData.json', jsonData, function(err) {
      if(err) {
        console.log(err);
      }
    });
    return productsResponse.json();
  };

