import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';
import { SearchComponent } from '../book-search/book-search.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule,SearchComponent],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;
  filteredBooks: Book[] = [];  
  loading = true;

  constructor(private bookService: BookService, private router: Router) {
    this.books$ = this.bookService.books$;
  }

  ngOnInit(): void {
    this.bookService.fetchBooksFromAPI().then(() => {
      this.loading = false;
      this.books$.subscribe(books => {
        this.filteredBooks = books;
      });
    });
  }

  onSearch(query: string): void {
    this.books$.subscribe(books => {
      if (!query) {
        this.filteredBooks = books;
      } else {
        this.filteredBooks = books.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query) ||
          book.isbn.toLowerCase().includes(query)
        );
      }
    });
  }

  onEdit(isbn: string) {
    this.router.navigate(['/edit', isbn]);
  }

  onDelete(isbn: string) {
    this.bookService.deleteBookByISBN(isbn);
  }

sortByAuthorAsc(): void {
  this.filteredBooks = [...this.filteredBooks].sort((a, b) =>
    a.author.localeCompare(b.author)
  );
}

sortByAuthorDesc(): void {
  this.filteredBooks = [...this.filteredBooks].sort((a, b) =>
    b.author.localeCompare(a.author)
  );
}

}

