# Region Large Token Detection

By default whether a token is inside a region is calculated solely on token centerpoint, this module overrides this behavior. For Large tokens (bigger that 1 square) it will test centerpoints of all of the token's squares. Token is in a region if any of the squares it occupies is in the region e.g. for 2x2 token all 4 squares will be tested.
