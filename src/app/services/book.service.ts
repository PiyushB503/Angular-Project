import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';
import { API_CONFIG } from '../config/api-config';
import { ApiBookService } from './api-book.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private apiBookService: ApiBookService) {}

   private baseUrl = API_CONFIG.BASE_URL;

  addBook(book: Book) {
    const books = [...this.booksSubject.value, book];
    this.booksSubject.next(books);
  }

  getBookByISBN(isbn: string): Book | undefined {
    return this.booksSubject.value.find(book => book.isbn === isbn);
  }

  updateBookByISBN(isbn: string, updatedBook: Book): void {
    const updated = this.booksSubject.value.map(book =>
      book.isbn === isbn ? updatedBook : book
    );
    this.booksSubject.next(updated);
  }

  deleteBookByISBN(isbn: string): void {
    const filtered = this.booksSubject.value.filter(book => book.isbn !== isbn);
    this.booksSubject.next(filtered);
  }

 async fetchBooksFromAPI(): Promise<void> {
    if (this.booksSubject.value.length > 0) return;
    const books = await this.apiBookService.fetchBooks();
    const current = this.booksSubject.value;
    this.booksSubject.next([...current, ...books]);
  }
}
