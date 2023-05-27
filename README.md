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

   ```json
   {
       "name":"Product uniq",
       "description": "buy or die",
       "price":"$10",
       "postedBy": "64689ff54ca94574a6574422",
       "endtime":"2023-05-27T16:02:36"
   }
   ```

   response object : (status false means item is still available to buy)

```json
{
    "productname": "Product uniq",
    "username": "test1",
    "email": "test1@test.com",
    "id": "6472362c523adfe87da3ab96",
    "price": "$10",
    "status": false,
    "endtime": "2023-05-27T10:32:36.000Z",
    "description": "buy or die",
    "request": true
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
           "_id": "646a12b674861b309cfdaf54",
           "userId": "64723acbdc56688f3a42df27",
           "amount": "$20",
           "productId": "64723532a7b5cee608aba209",
           "createdAt": "2023-05-21T12:46:46.900Z",
           "updatedAt": "2023-05-21T12:46:46.900Z",
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
   body: (profileUrl, phone is optional)

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
11. baseurl/user/update/:id : (POST)

    body:
    (the previous values are passsed unaltered along with new updates)
    (phone, profileUrl are optional)

    ```
    {
    	"email": "test@test.com",
    	"password": "test_update",
    	"name": "test_update",
    	"username": "test_update",
    	"phone: "1234567890",
    	"profileUrl": "localhost:8000/a.jpg"
    }
    ```

    Response:
    (phone and profileUrl will be sent if modified)

    ```
    {
    	"email": "test@test.com",
    	"name": "test_update",
    	"username": "test_update",
    	"id": "64689ff54ca94574a6574422",
    	"request": true
    }
    ```
12. baseurl/buy : (PUT)

    call it when the timer for a product ran out

    body : (userID is the id of highest bid )

    ```json

    {
        "id":"6472362c523adfe87da3ab96",
        "userId": "64689ff54ca94574a6574422"
    }
    ```

    response :

```
{
    "request": true
}
```

13. baseurl/user/product/:userId
    response :

    ```json
    [
        {
            "_id": "64723532a7b5cee608aba209",
            "name": "Product not",
            "description": "buy or die",
            "price": "$10",
            "postedBy": "64689ff54ca94574a6574422",
            "status": true,
            "endtime": "2023-05-27T10:32:36.000Z",
            "createdAt": "2023-05-27T16:52:02.172Z",
            "updatedAt": "2023-05-27T18:17:34.010Z",
            "__v": 0,
            "highBid": "64723acbdc56688f3a42df27"
        }
    ]
    ```
