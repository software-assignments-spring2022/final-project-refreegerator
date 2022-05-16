import axios from 'axios';

async function getKrogerToken(){
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'product.compact');
  
    const response = await axios.post('https://api.kroger.com/v1/connect/oauth2/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      }
    });
  
    return response.data.access_token;
  }
  
  
const getKrogerLocation = async (radius, limit, zipCode, access_token) => {
return await axios.get(`https://api.kroger.com/v1/locations?filter.radiusInMiles=${radius}&filter.limit=${limit}&filter.zipCode.near=${zipCode}`, {
    headers: {
    'Authorization': `Bearer ${access_token}`
    }
})
}
  
const findKrogerProduct = async(term, locationId, access_token) => {
return await axios.get(`https://api.kroger.com/v1/products?filter.brand=Kroger&filter.term=${term}&filter.locationId=${locationId}`, {
    headers: {
    'Authorization': `Bearer ${access_token}`,
    }
})
}
  
const filterOutBadStore = (stores) => {
return stores.filter((store) => store.name.includes('Kroger'));
}

async function getKrogerItem(itemName, zipcode){
const access_token = await getKrogerToken();

const {data: {data: stores}}= await getKrogerLocation(10, 10, zipcode, access_token);
const {locationId, name} = filterOutBadStore(stores)[0];

const {data: {data: products}} = await findKrogerProduct(itemName, locationId, access_token);

let item = products[0];

const productResponse = {
    locationName: name,
    brand: item.brand,
    description: item.description,
    price: item.items[0].price.regular,
}

return productResponse;
}
  
  