import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/books'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  title = '';
  author = '';
  publication_date = '';
  isbn = '';
  genre = '';
  editMode = false;
  originalIsbn: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.route.paramMap.subscribe((params) => {
      const isbn = params.get('isbn');
      if (isbn) {
        const book = this.bookService.getBookByISBN(isbn);
        if (book) {
          this.editMode = true;
          this.originalIsbn = isbn;
          this.title = book.title;
          this.author = book.author;
          this.publication_date = book.publication_date;
          this.isbn = book.isbn;
          this.genre = book.genre;
        }
      }
    });
  }

  onSubmit() {
    const book: Book = {
      title: this.title,
      author: this.author,
      publication_date: this.publication_date,
      isbn: this.isbn,
      genre: this.genre
    };

    if (this.editMode) {
      this.bookService.updateBookByISBN(this.originalIsbn, book); 
    } else {
      this.bookService.addBook(book); 
    }

    this.router.navigate(['/list']); 
  }

  onCancel() {
    this.router.navigate(['/list']);  
  }
}
