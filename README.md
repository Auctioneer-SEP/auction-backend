# Auction-Backend

### End Point

1. baseurl/auction/product/:id : (GET)
   id is the product id generated from mongo db
   response format :

   ```
   {
       "img": "uel.com",
       "productname": "Product",
       "username": "test",
       "email": "test@test.com",
       "id": "6469daa5c1a15d5c797c4d3a",
       "price": "$10",
       "description": "buy or die",
       "request": true
   }
   ```
2. baseurl/auction/product : (GET)
   get all products
   response format :

   ```json
   [{"_id":"6469daa5c1a15d5c797c4d3a",
   "name":"Product","description":"buy or die",
   "img":"uel.com",
   "price":"$10",
   "postedBy":"6468984ec5252af8039edf20",
   "createdAt":"2023-05-21T08:47:33.130Z",
   "updatedAt":"2023-05-21T08:47:33.130Z",
   "__v":0
   }]

   ```
3. baseurl/auction/product/ : (POST)
   body of the request :

   ```

   {
       "name":"Product",
       "description": "buy or die",
       "img":"uel.com",
       "price":"$10",
       "postedBy": "6468984ec5252af8039edf20"
   }
   ```

   response object :

```json
{
   img: user.img,
   productname: user.name,
   username: data.username,
   email : data.email,
   id: user._id,
   price : user.price,
   description: user.description,
   request: true
}
```

4. baseurl/auction/bid/ : (POST)
   Automatically handles updating values of bid if user already made one.
   body of request :

   ```
   {

       "userId": "64689ff54ca94574a6574422",
       "amount":"$20",
       "productId":"6469daa5c1a15d5c797c4d3a"
   }
   ```

   response :

```
{
    "request": true,
    "amount": "$20",
    "userId": "64689ff54ca94574a6574422",
    "username": "test1",
    "productId": "6469daa5c1a15d5c797c4d3a"
}
```

5. baseurl/auction/bid/:productId : (GET)
6. baseurl/user/bid/:userId : (GET)
   give userId or  productId and there endpoints return array of bids related to that
   response :

   ```
   [
       {
           "_id": "6469daa5c1a15d5c797c4d3a",
           "name": "Product",
           "description": "buy or die",
           "img": "uel.com",
           "price": "$10",
           "postedBy": "6468984ec5252af8039edf20",
           "createdAt": "2023-05-21T08:47:33.130Z",
           "updatedAt": "2023-05-21T08:47:33.130Z",
           "__v": 0
       }
   ]
   ```
7. baseurl/fav/:userId : (GET)

   give id of user to get list of all products they marked as favourite

  6.baseurl/fav/:userId : (GET)

   response :

```json
[
    {
        "_id": "646a29638bd9502d7e90b997",
        "userId": "64689ff54ca94574a6574422",
        "productId": "6469daa5c1a15d5c797c4d3a",
        "createdAt": "2023-05-21T14:23:32.011Z",
        "updatedAt": "2023-05-21T14:23:32.011Z",
        "__v": 0
    }
]
```

8. baseurl/fav : (POST & DELETE)
   body :

   ```json
   {

       "userId": "64689ff54ca94574a6574421",
       "productId":"6469daa5c1a15d5c797c4d3a"
   }
   ```

   Response :

```json
{
    "userId": "64689ff54ca94574a6574420",
    "productId": "6469daa5c1a15d5c797c4d3a",
    "_id": "646a4c8365aab8633694a8af",
    "createdAt": "2023-05-21T16:53:23.171Z",
    "updatedAt": "2023-05-21T16:53:23.171Z",
    "__v": 0,
    "request": true
}
```


9. baseurl/auth/sign-up : (POST)
   body: (profileUrl is optional)

   ```
   {
   	"email": "test@test.com",
   	"password": "test",
   	"confirm_password": "test",
   	"name": "test",
   	"username": "test",
   	"phone: "1234567890",
   	"profileUrl": "localhost:8000/a.jpg"
   }
   ```
   Response:

   ```
   {
   	"email": "test4@test.com",
   	"name": "test4",
   	"username": "test4",
   	"phone": "1234567894",
   	"id": "646cc87d33a2bb532529e2bd",
   	"profileUrl": "localhost:8000/a.jpg",
   	"request": true
   }
   ```
10. baseurl/auth/sign-in : (POST)

    body:

    ```
    {
    	"email": "test4@test.com",
    	"password": "test4"
    }
    ```
    Response:

    ```
    {
        "email": "test4@test.com",
        "name": "test4",
        "username": "test4",
        "phone": "1234567894",
        "id": "646cc87d33a2bb532529e2bd",
        "profileUrl": "localhost:8000/a.jpg",
        "request": true
    }
    ```
