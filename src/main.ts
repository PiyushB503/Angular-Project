import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './app/components/book-form/book-form.component';
import { BookListComponent } from './app/components/book-list/book-list.component';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch(err => console.error(err));
