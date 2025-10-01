# Document Management Application

## Overview

This application is a document management tool that allows users to upload, categorize, and manage documents. It also includes a chat interface for interacting with an AI assistant to extract information from the documents.

## Style, Design, and Features

### Implemented

- **Component-based architecture:** The application is built using Angular and follows a component-based architecture.
- **Standalone Components:** All components are standalone, promoting modularity and reusability.
- **Modern Angular Features:** The application leverages modern Angular features like signals, new control flow syntax, and `ChangeDetectionStrategy.OnPush` for optimal performance.
- **JSON Server:** A simple JSON server is used to mock the backend API.
- **Basic UI:** The application has a basic UI with a sidebar for navigation and a main content area to display the components.
- **Interactive KVP Highlighting:** When a user clicks on a key-value pair in the editor, the corresponding location in the document viewer is highlighted.
- **Search Functionality:** A search bar allows users to filter documents by title and content.
- **Category Filtering:** Users can filter documents by selecting a category from a list.
- **AI Chat Interface:** A chat interface allows users to interact with an AI assistant.

---

## Known Issues

**Critical Build Failure - Document View Inoperable**

The application is currently failing to build, which prevents the document views from functioning correctly.

- **Error Details:** The build process is consistently failing with TypeScript errors `TS7030: Not all code paths return a value` and `TS2678: Type '...' is not comparable to type '...'`. These errors originate from the `getIcon` function within the `document-list.component.ts`.
- **Attempted Fixes:**
    1.  Corrected the component's internal data structures (`trash` signal).
    2.  Refactored the problematic `getIcon` function from a `switch` statement to a more robust object lookup.
    3.  Validated and corrected the mock data types in `document.service.ts`.
    4.  Cleared the Angular cache (`ng cache clean`) to eliminate potential stale builds.
- **Current Status:** Despite these fixes, the build continues to fail with the exact same errors, indicating that the code changes are not being recognized by the build process. This suggests a deeper issue with the development environment's caching or state.
- **Next Step:** A full restart of the IDE is recommended to resolve the underlying environmental issue.

---

## Development Plan

### Current Plan

**Phase 6: Bug Fixes and Routing**

1.  **Restore Routing:** The `app.component.html` was reverted to use the `<router-outlet>`, which will re-enable the proper routing functionality.
2.  **Set Dashboard as Default:** The `app.routes.ts` was updated to make the `/dashboard` the default route, so it's the first thing you see.
3.  **Clean Up Imports:** The `DocumentWorkspaceComponent` was removed from the `AppComponent`'s imports, as it's no longer needed there.

### Future Phases

**Phase 7: Refine and Polish**

1.  **Improve UI/UX:** Refine the overall look and feel of the application, including the layout, styling, and user interactions.
2.  **Enhance Chat Functionality:** Add features like message timestamps, user avatars, and improved message formatting.
3.  **Implement Real-time Updates:** Use a real-time database like Firestore to enable real-time updates for documents and chat messages.
4.  **Add Authentication:** Implement user authentication to secure the application and personalize the user experience.
5.  **Deploy to Firebase:** Deploy the application to Firebase Hosting for easy access and sharing.
