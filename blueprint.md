### Overview
This application is a document management system that allows users to upload, categorize, and review documents. It features a dashboard for a quick overview, a document workspace for managing documents, and a detailed view for individual document inspection.

### Style and Design
- **Layout**: Clean, modern, and responsive two-column layout.
- **Color Scheme**: Primarily uses a blue and gray color palette for a professional look.
- **Typography**: Clear and legible sans-serif fonts.
- **Iconography**: Uses icons to enhance user understanding and navigation.

### Features
- **Dashboard**: Provides a summary of document statistics and recent activity.
- **Document Workspace**: A central hub for managing all documents, with features for filtering, sorting, and performing bulk actions.
- **Document Detail View**: A dedicated view for each document, displaying its content, metadata, and available actions.

### Current Plan: Phase 3 - Document Detail View
- **Objective**: Create a new page that provides a comprehensive view of a single document.
- **Steps**:
  - Generate a `DocumentDetailComponent` to display the main content of the document.
  - Generate a `MetadataSidebarComponent` to show the document's metadata.
  - Generate an `ActionToolbarComponent` for document-specific actions like re-categorizing or deleting.
  - Assemble these components into a `DocumentDetailPage` container.
  - Update the routing to include a route to the `DocumentDetailPage`.
