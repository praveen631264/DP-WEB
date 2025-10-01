# Refactoring Plan: Intelligent Document Assistant (IDA) v6.0 (Final)

This document outlines the step-by-step process to refactor the existing application to match the approved `blueprint.md` for the Intelligent Document Assistant v6.0.

---

### **Preamble: Adherence to Modern Angular Standards**

All code generated or modified during this refactoring process will strictly adhere to the latest Angular best practices as defined by the persona guidelines. This includes, but is not limited to:

*   **100% Standalone Architecture:** All new components, directives, and pipes will be standalone. No `NgModules` will be used.
*   **Change Detection:** All components will use `changeDetection: ChangeDetectionStrategy.OnPush`.
*   **Component Inputs/Outputs:** The `input()` and `output()` functions will be used exclusively, replacing the legacy `@Input()` and `@Output()` decorators.
*   **Built-in Control Flow:** All templates will use the new `@` syntax (`@if`, `@for`, `@switch`).
*   **Dependency Injection:** The `inject()` function will be used for dependency injection within an injection context.

---

### **Phase 1: Core Scaffolding & Routing**
*   **Objective:** Create the basic component structure and routing foundation.
*   **Steps:**
    1.  Clean up Global Sidebar: Modify `src/app/sidebar/sidebar.component.html`.
    2.  Create Document Workspace Component: `ng generate component document-workspace`.
    3.  Update Application Routes: Modify `src/app/app.routes.ts`.
*   **Verification:** `ng build` must pass and the new "Documents" link must work.

---

### **Phase 2: Implement the Document Workspace Panels**
*   **Objective:** Build out the panels within the `DocumentWorkspaceComponent`.
*   **Steps:**
    1.  Create Panels: Generate `RecentDocumentsComponent`, `DocumentUploadComponent`.
    2.  Repurpose `DocumentListComponent` into `DocumentGridComponent`.
    3.  Assemble Workspace and apply initial styles.
*   **Verification:** `ng build` must pass and the two-panel layout must be correctly styled on the `/documents` route.

---

### **Phase 3: Structure the Document Detail View & State Management**
*   **Objective:** Create the three-panel structure and establish a robust state management strategy for this complex view.
*   **Steps:**
    1.  Remove Old Component: Delete the `src/app/document-edit` directory.
    2.  **Create State Service:** Create a new injectable service `DocumentDetailState.service.ts`. This service will hold signals for the currently loaded document, its KVP list, and its chat history.
    3.  Create New View Structure: `ng generate component document-detail`. This component will inject the state service.
    4.  Update Routing: Add the `{ path: 'documents/:id', ... }` route, using a resolver to fetch initial data and populate the `DocumentDetailState` service.
    5.  Generate Panel Components: `ng generate component kvp-editor`, `ng generate component document-viewer`, `ng generate component document-chat`. These components will inject the state service to read and update data, eliminating direct parent-child communication.
    6.  Assemble the Detail View and apply styles.
*   **Verification:** `ng build` must pass. Navigating to `/documents/123` should show the three-panel layout, and the `DocumentDetailState` service should be populated with the correct data.

---

### **Phase 4: Implement Data Layer and Upload Logic**
*   **Objective:** Align data models and services with the file-centric structure.
*   **Steps:**
    1.  Update `document.model.ts` and `document.service.ts`.
    2.  Add `uploadDocument(file: File)` method to `document.service.ts` to simulate the upload.
*   **Verification:** `ng build` must pass, fixing any compile-time errors.

---

### **Phase 5: Implement Interactive UI Components**
*   **Objective:** Build the client-side UI and logic for the core interactive features.
*   **Steps:**
    1.  Implement `DocumentUploadComponent`: Build UI and logic to call the `documentService.uploadDocument()` method.
    2.  Implement `GlobalChatComponent`, `DocumentChatComponent`, `KvpEditorComponent`, and `DocumentViewerComponent`. These components will now interact with the `DocumentDetailState` service to get their data and dispatch actions.
    3.  Apply final styles to all interactive components.
*   **Verification:** `ng build` must pass. Test the upload component. Visually inspect all components to ensure they reflect the state from the `DocumentDetailState` service.

---

### **Phase 6: Implement Service Logic & AI Feedback Loop**
*   **Objective:** Create service-layer contracts and connect the UI to them.
*   **Steps:**
    1.  Create `AiChatService` with mock AI logic.
    2.  Update `DocumentService` to provide a feedback signal.
    3.  Connect Components to Services: Wire up the `DocumentDetailState` service to call the `AiChatService` and `DocumentService` methods.
*   **Verification:** Perform end-to-end UX tests for AI chat and KVP feedback loop, ensuring the UI correctly reflects state changes from the `DocumentDetailState` service.

---

### **Phase 7: Final Cleanup & Performance Profiling**
*   **Objective:** To remove obsolete code and ensure the application is performant.
*   **Steps:**
    1.  Remove the "Avg. Processing Time" card from `dashboard.html` and any associated dead code.
    2.  **Performance Profiling:** Use Angular DevTools to inspect change detection cycles and memory usage in the `DocumentDetailView` during interaction. Optimize signals and component structure as needed to prevent performance bottlenecks.
*   **Verification:** `ng build` must pass. Obsolete card must be gone. The app must feel responsive with no noticeable lag during chat or KVP editing.

---

### **Phase 8: Error Handling & Resilience**
*   **Objective:** To make the application resilient to common errors.
*   **Steps:**
    1.  **Implement Global Error Handler:** Create an `HttpInterceptor` that catches API errors, logs them, and shows a user-friendly toast notification.
    2.  **Component-Level Error States:** Add error-state logic to the `DocumentChatComponent` (e.g., a "Message failed to send. Retry?" option) and `DocumentViewerComponent` (e.g., a "Could not load document" message).
*   **Verification:** `ng build` must pass. Manually simulate an API error in the `AiChatService` and verify the global error handler displays a toast. Verify the component-level error states appear correctly.

---

### **Appendix: Work Completed So Far (Pre-Refactor State)**
*   **Summary:** The current application is a simple text-file editor with a basic dashboard, not the AI-powered tool from the blueprint.
