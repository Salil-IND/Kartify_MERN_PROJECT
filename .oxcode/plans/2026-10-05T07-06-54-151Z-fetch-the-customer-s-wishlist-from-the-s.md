# Fetch the customer's wishlist from the server and update it (add a product) when needed, wiring the client-side Wishlist page to the existing backend endpoints.

## Review

Reviewed before you saw it: Check c2 in the draft used `require('./index.js')` on an ESM project (Server/index.js uses `import` statements), which would fail with a syntax error regardless of correctness. Removed it.; Check c4 in the draft looked for the string 'delete' or 'DELETE' but the actual Express method call is `.delete(`, so changed to check for '.delete' to avoid false-matching a comment while still catching the method call.; Check c5 in the draft checked for the bare string 'delete' which could match a comment; changed to '.delete' to match the actual axiosInstance.delete call.; Step s3 renders ProductCard but ProductCard.jsx has pre-existing syntax errors (baseline diagnostics). Added a note to render the remove button and possibly product info independently of ProductCard to avoid runtime breakage.

## Structure

Files and folders this plan touches or creates:

```
Client/
  src/
    pages/
      ProductDetails.jsx
      Wishlist.jsx
Server/
  controllers/
    wishlist.controllers.js
  routes/
    wishlist.routes.js
```

- `Client/src/pages/Wishlist.jsx` - Rewrite to fetch the customer's wishlist via GET /wishlist on mount, display the products, and provide a remove-from-wishlist action.
- `Server/controllers/wishlist.controllers.js` - Fix the ObjectId comparison bug in addToWishList and add a removeFromWishList controller.
- `Server/routes/wishlist.routes.js` - Add DELETE route for removing a product from the wishlist.
- `Client/src/pages/ProductDetails.jsx` - Ensure the 'Add to Wishlist' button calls POST /wishlist/:productId correctly.

## Steps

1. **Fix ObjectId comparison bug and add removeFromWishList in Server/controllers/wishlist.controllers.js**
   Open `Server/controllers/wishlist.controllers.js`.

1. **Fix `addToWishList`**: The existing comparison `customer.wishlist.some((id) => id === productId)` compares an ObjectId object to a string, which always returns false, so duplicates are never detected. Change it to `customer.wishlist.some((id) => id.toString() === productId)`. Also wrap the body in try/catch, returning `500 { message: 'Server error' }` on failure.

2. **Fix `getWishList`**: Populate the wishlist so the client receives full product objects instead of bare IDs: change `Customer.findById(customerId)` to `Customer.findById(customerId).populate('wishlist')`. Wrap in try/catch.

3. **Add `removeFromWishList`**: Export a new async function `removeFromWishList(req, res)`. It reads `req.params.productId`, finds the customer via `req.customerData._id`, filters the wishlist array to remove the matching ID (`customer.wishlist = customer.wishlist.filter(id => id.toString() !== productId)`), calls `await customer.save()`, and returns `200 { message: 'Removed from Wishlist' }`. Return 400 if `productId` is missing. Wrap in try/catch.
   Interfaces: addToWishList(req: Request, res: Response): Promise<void>, getWishList(req: Request, res: Response): Promise<void>, removeFromWishList(req: Request, res: Response): Promise<void>

2. **Register the DELETE route in Server/routes/wishlist.routes.js**
   Open `Server/routes/wishlist.routes.js`. Import `removeFromWishList` from `../controllers/wishlist.controllers.js` (add it to the existing destructured import). Add the line:

```
wishListRoutes.delete('/:productId', isAuthenticated, removeFromWishList);
```

Place it after the existing POST route. The route file is already mounted at `/wishlist` in `Server/index.js`, so no changes are needed there.
   Interfaces: DELETE /wishlist/:productId -> { message: string }

3. **Implement the Wishlist page in Client/src/pages/Wishlist.jsx**
   Rewrite `Client/src/pages/Wishlist.jsx`. The file already imports `axiosInstance` from `../axiosCalls/axios.js`, `Navbar` from `../components/Navbar.jsx`, and `ProductCard` from `../components/ProductCard.jsx`.

Implementation:
1. Import `useState`, `useEffect` from React.
2. On mount (`useEffect([], ...)`), call `axiosInstance.get('/wishlist')`. Store `response.data.wishlist` (an array of populated product objects, thanks to the populate added in step 1) in a `wishlist` state variable. Also keep a `loading` state.
3. Create `handleRemove(productId)`: calls `axiosInstance.delete(`/wishlist/${productId}`)`, then on success filters the local `wishlist` state to remove that product so the UI updates instantly without a refetch.
4. Render `<Navbar />` at the top. Below it, if `loading`, show a loading message. If `wishlist` is empty, show 'Your wishlist is empty'. Otherwise map over `wishlist` and render each product's info. Next to each product, render a 'Remove' button that calls `handleRemove(product._id)`.
5. Export as default.

Note: `ProductCard` currently has a pre-existing syntax error (baseline diagnostic). Avoid depending on `ProductCard` for the remove button — render the remove button outside/alongside it, or render product info directly without `ProductCard` if the import causes issues at runtime.
   Interfaces: WishlistPage(): JSX.Element, handleRemove(productId: string): void

4. **Wire 'Add to Wishlist' in Client/src/pages/ProductDetails.jsx**
   Open `Client/src/pages/ProductDetails.jsx`. It already imports `axiosInstance` and `useAuth`.

1. Add a state `const [wishlistMsg, setWishlistMsg] = useState('')`.
2. Add a handler `handleAddToWishlist` that calls `axiosInstance.post(`/wishlist/${product._id}`)` (where `product` is the product state already in the component). On success set `wishlistMsg` to the response message ('Added to Wishlist' or 'Already in wishlist'). On error set an error message.
3. In the JSX, render a button labelled 'Add to Wishlist' that calls `handleAddToWishlist`. Below it, conditionally render `wishlistMsg` so the user gets feedback.
4. Only show the button if `customer` (from `useAuth`) is truthy, so logged-out users don't see it.
   Interfaces: handleAddToWishlist(): Promise<void>

## Acceptance checks

- No new diagnostics errors beyond the pre-existing 2 in ProductCard.jsx
- removeFromWishList controller is exported from wishlist.controllers.js (`node -e "const fs=require('fs');const c=fs.readFileSync('Server/controllers/wishlist.controllers.js','utf8');process.exit(c.includes('removeFromWishList')?0:1)"`)
- DELETE route is registered in wishlist.routes.js (`node -e "const fs=require('fs');const c=fs.readFileSync('Server/routes/wishlist.routes.js','utf8');process.exit(c.includes('.delete')?0:1)"`)
- Wishlist.jsx fetches from /wishlist and handles remove (`node -e "const fs=require('fs');const c=fs.readFileSync('Client/src/pages/Wishlist.jsx','utf8');process.exit(c.includes('/wishlist') && c.includes('.delete')?0:1)"`)
- ProductDetails.jsx has add-to-wishlist functionality (`node -e "const fs=require('fs');const c=fs.readFileSync('Client/src/pages/ProductDetails.jsx','utf8');process.exit(c.includes('wishlist')?0:1)"`)

---

Written by OxCode for you to read. Editing this file does not change the run: use the comment box on the plan card to ask for changes.
