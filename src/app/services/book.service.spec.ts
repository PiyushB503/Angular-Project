import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';
import { API_CONFIG } from '../config/api-config';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a book', () => {
    const mockBook: Book = {
      title: 'Angular 101',
      author: 'John Doe',
      publication_date: '2020',
      isbn: '1234567890',
      genre: 'Tech'
    };

    service.addBook(mockBook);

    service.books$.subscribe(books => {
      expect(books.length).toBe(1);
      expect(books[0].title).toBe('Angular 101');
    });
  });

  it('should return a book by ISBN', () => {
    const book: Book = {
      title: 'RxJS Guide',
      author: 'Jane Doe',
      publication_date: '2021',
      isbn: '9999',
      genre: 'Programming'
    };

    service.addBook(book);

    const found = service.getBookByISBN('9999');
    expect(found).toEqual(book);
  });

  it('should update a book by ISBN', () => {
    const book: Book = {
      title: 'Old Title',
      author: 'Author A',
      publication_date: '2019',
      isbn: 'abc123',
      genre: 'Science'
    };

    const updated: Book = {
      ...book,
      title: 'New Title'
    };

    service.addBook(book);
    service.updateBookByISBN('abc123', updated);

    service.books$.subscribe(books => {
      expect(books.find(b => b.isbn === 'abc123')?.title).toBe('New Title');
    });
  });

  it('should delete a book by ISBN', () => {
    const book: Book = {
      title: 'To Be Deleted',
      author: 'Someone',
      publication_date: '2022',
      isbn: 'del-001',
      genre: 'History'
    };

    service.addBook(book);
    service.deleteBookByISBN('del-001');

    service.books$.subscribe(books => {
      expect(books.find(b => b.isbn === 'del-001')).toBeUndefined();
    });
  });

  it('should fetch books from API (mocked)', async () => {
    const mockResponse = {
      items: [
        {
          volumeInfo: {
            title: 'API Book',
            authors: ['API Author'],
            publishedDate: '2024',
            industryIdentifiers: [{ identifier: 'api-123' }],
            categories: ['Education']
          }
        }
      ]
    };

    spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify(mockResponse)));

    await service.fetchBooksFromAPI();

    service.books$.subscribe(books => {
      expect(books.length).toBeGreaterThan(0);
      expect(books[0].title).toBe('API Book');
    });
  });

  it('should not fetch if books already exist', async () => {
    const book: Book = {
      title: 'Already Added',
      author: 'Tester',
      publication_date: '2023',
      isbn: 'exist-001',
      genre: 'Drama'
    };

    service.addBook(book);

    const fetchSpy = spyOn(window, 'fetch');

    await service.fetchBooksFromAPI();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
