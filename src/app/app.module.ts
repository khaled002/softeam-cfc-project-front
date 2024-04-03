import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { primeComponentsModule } from './shared/prime-components.module';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ThankYouModalComponent } from './thank-you-modal/thank-you-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/app.layout.module';
import { LocomotionComponent } from './formulaire/locomotion/locomotion.component';


@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    ThankYouModalComponent,
    LoginComponent,
    DashboardComponent,
    LocomotionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    primeComponentsModule,
    AppLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
