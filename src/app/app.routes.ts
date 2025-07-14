import { Routes } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: BookFormComponent },
   { path: 'edit/:isbn', component: BookFormComponent },
  { path: 'list', component: BookListComponent }
];
