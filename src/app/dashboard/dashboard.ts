import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  stats = this.dashboardService.getDashboardStats();
}
