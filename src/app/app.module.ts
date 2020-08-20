import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinksTableComponent } from './components/links-table/links-table.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { CreateShortFormComponent } from './components/create-short-form/create-short-form.component';

import { ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';
import { ChartsModule } from 'ng2-charts';
import { MainPageContainerComponent } from './components/main-page-container/main-page-container.component';
import { DetailsComponent } from './components/details/details.component';
import { ChartComponent } from './components/chart/chart.component';
import { GenerateDownloadQrComponent } from './components/generate-download-qr/generate-download-qr.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthContainerComponent } from './components/auth-container/auth-container.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LinksTableComponent,
    CreateShortFormComponent,
    MainPageContainerComponent,
    DetailsComponent,
    ChartComponent,
    GenerateDownloadQrComponent,
    NavbarComponent,
    LoginFormComponent,
    AuthContainerComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    ClipboardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    QRCodeModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    ChartsModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
