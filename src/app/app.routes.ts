import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { DocumentListComponent } from './document-list/document-list';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { ChatComponent } from './chat/chat';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'documents', component: DocumentListComponent },
    { path: 'documents/:doc_id', component: DocumentDetailComponent },
    { path: 'chat', component: ChatComponent },
];
