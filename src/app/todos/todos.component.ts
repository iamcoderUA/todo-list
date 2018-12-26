import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {

  constructor(
    private authService: AuthService,
  ) {
  }

  logoutUser() {
    this.authService.logout();
  }
}
