# Document AI

## Overview

This application is a powerful Document AI that allows you to upload and interact with your documents in a whole new way. You can ask questions, get summaries, and even extract key information from your files. The app is built with the latest Angular features, including standalone components, signals, and the new control flow syntax.

## Implemented Features

### Phase 1: Project Setup and Initial UI

*   **Project Initialization:** The project was created using the Angular CLI, with all the necessary dependencies installed.
*   **Initial UI:** A basic UI was created with a header, a main content area, and a footer. The header includes the application title, and the main content area has a placeholder for the document upload form.

### Phase 2: Document Upload and Listing

*   **Document Upload:** A document upload form was created that allows users to select a file from their local machine. The form includes a file input and a submit button.
*   **Document Listing:** A document list component was created that displays a list of all the documents that have been uploaded. The list includes the document title and a button to view the document.

### Phase 3: Document Detail View

*   **Document Detail Component:** A document detail component was created that displays the content of a selected document. The component includes a document viewer and a key-value pair editor.
*   **Document Viewer:** The document viewer displays the content of the document in a paginated format. The viewer includes controls to navigate between pages.
*   **Key-Value Pair Editor:** The key-value pair editor allows users to add, edit, and delete key-value pairs associated with the document.

### Phase 4: Interactive Key-Value Editor and Chat

*   **Interactive Key-Value Editor:** The key-value pair editor was made interactive, allowing users to create, update, and delete key-value pairs.
*   **Chat Functionality:** A chat component was created that allows users to ask questions about the document and get answers from the AI.

### Phase 5: AI-Powered Key-Value Extraction

*   **UI for Key-Value Extraction:** Added a new UI section in the `KvpEditorComponent` that allows users to enter a prompt and initiate the extraction of key-value pairs.
*   **State Management for Extraction:** Implemented the necessary state management logic in `DocumentDetailStateService` to handle the extraction process. This includes calling the `KvpService` and updating the application's state with the extracted key-value pairs.
*   **Component Integration:** Connected the `KvpEditorComponent` to the `DocumentDetailPage` to enable the flow of data and events required for the extraction feature.

## Current Plan

### Phase 6: Refine and Enhance

*   **Error Handling:** Implement robust error handling for API calls and other asynchronous operations.
*   **Loading Indicators:** Add loading indicators to provide feedback to the user when data is being fetched or processed.
*   **UI/UX Polish:** Review and refine the overall user interface and experience.
