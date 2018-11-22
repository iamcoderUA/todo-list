import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { TodoItemsState } from './ngxs/todo-items/todo-items.state';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    NgxsModule.forRoot([
      TodoItemsState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
