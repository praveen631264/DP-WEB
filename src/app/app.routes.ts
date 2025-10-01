import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { DocumentWorkspace } from './document-workspace/document-workspace';
import { DocumentDetailPage } from './document-detail-page/document-detail-page';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'documents', component: DocumentWorkspace },
    { path: 'documents/:id', component: DocumentDetailPage },
    { path: 'chat', component: ChatComponent },
];
