import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './app/components/book-form/book-form.component';
import { BookListComponent } from './app/components/book-list/book-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: BookFormComponent },
   { path: 'edit/:isbn', component: BookFormComponent },
  { path: 'list', component: BookListComponent }
];


bootstrapApplication(App, {
  providers: [importProvidersFrom(FormsModule),
    importProvidersFrom(RouterModule.forRoot(routes))
  ],
}).catch(err => console.error(err));
