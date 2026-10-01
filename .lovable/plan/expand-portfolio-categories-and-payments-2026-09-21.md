# Expand portfolio categories and payments

## What will change
- Add nine new 16:9 collections: Banner, Overlay and Panels, Emotes, Intro, Outro, Thumbnail, 3D Model, and 2D Model.
- Add three new 9:16 collections: Character Art, D&D, and Logo.
- Keep four inline videos in every collection with the existing play/pause and sound controls.
- Preserve the current premium one-page layout and automatically update the total film count.
- Add Cash App as a second payment method beside PayPal, linking to `https://cash.app/$SyedAbdullah16`.
- Update the payment navigation label so both methods are represented.

## Technical details
- Extend the existing collection data with the requested aspect ratio for each category.
- Reuse the established portrait and landscape grids rather than introducing a new layout system.
- Adjust the payment section styling for two clearly separated payment actions, while retaining the PayPal QR code.
- Verify the page at desktop and mobile sizes, video controls, payment links, and the final build.

## Assumption
- “Banner, Overlay and Panels” is treated as one portfolio category; the supplied Cash App link is used directly without a Cash App QR code.
