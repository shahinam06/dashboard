
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SectionComponent } from './section/section.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import {MatTableModule} from '@angular/material/table';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { ChartsComponent } from './charts/charts.component';
import { isPlatformBrowser } from '@angular/common';
// import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    SectionComponent,
    UserAvatarComponent,
    ProgressBarsComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    // NgApexchartsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }