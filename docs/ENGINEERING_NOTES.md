# Kiddo SDUI Homepage Renderer — Engineering Notes

## Architecture Summary
This project implements a production-grade, infinitely scalable Server-Driven UI engine for React Native.
The client acts as a strictly typed "dumb renderer" — allowing the backend to fully control layouts, campaigns, and theming via OTA JSON payloads without App Store updates.

## Key Decisions

### 1. O(1) Component Registry
Instead of a massive `switch(type)` statement inside the renderer, components are registered in a TypeScript hash map.
**Scalability Benefit:** Adding `FLASH_SALE_TIMER` tomorrow only requires adding it to the registry. The core `Renderer` never needs to be touched again. SOLID Open/Closed principle is strictly followed.

### 2. Zustand over Context for Fast-Moving Data
React Context forces re-renders on all consumers. By using Zustand with granular atomic selectors, we achieved absolute O(1) render isolation for `ADD_TO_CART` actions.

### 3. FlashList Virtualization
We utilize Shopify's `@shopify/flash-list` vertically, and deeply nested horizontal `FlashList`s for `DYNAMIC_COLLECTION`.
By implementing `getItemType={(item) => item.type}`, we allow the engine to recycle memory views intelligently based on layout type (e.g., reusing Banner views for other Banners, but not for Product Grids).

### 4. Resilient Fallbacks
If the backend sends a `"type": "NEW_COMPONENT_V2"` that the old client does not support, the app will not crash. It will fall back to `UnknownComponent`, log a warning, and render a 0-height invisible view, keeping the rest of the layout perfectly intact.

### Tradeoffs Accepted
- **Complexity over Simplicity:** Setting up generic TypeScript Discriminated Unions for `SDUINode` takes longer initially but eliminates runtime crashes forever.
- **Component Boilerplate:** Using `React.memo` everywhere requires more boilerplate, but is essential for an SDUI list of 500+ items.
