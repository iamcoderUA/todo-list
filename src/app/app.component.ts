import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { SpinnerService } from './core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoaderShown$: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) {
    this.isLoaderShown$ = this.spinnerService.isLoading$;
  }
}
