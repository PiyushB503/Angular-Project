import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockBookService: any;
  let mockRouter: any;

  const mockBooks: Book[] = [
    { title: 'Alpha', author: 'Zara', publication_date: '2021-01-01', isbn: '1', genre: 'Sci-fi' },
    { title: 'Beta', author: 'Aaron', publication_date: '2022-01-01', isbn: '2', genre: 'Fantasy' }
  ];

  beforeEach(async () => {
    mockBookService = {
      books$: of(mockBooks),
      fetchBooksFromAPI: jasmine.createSpy('fetchBooksFromAPI').and.returnValue(Promise.resolve()),
      deleteBookByISBN: jasmine.createSpy('deleteBookByISBN')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load books and set loading to false', async () => {
    await mockBookService.fetchBooksFromAPI();
    fixture.detectChanges();

    expect(mockBookService.fetchBooksFromAPI).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.filteredBooks.length).toBe(2);
  });

  it('should filter books by search query (case-insensitive)', () => {
    component.onSearch('alpha');
    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].title).toBe('Alpha');
  });

  it('should return all books if search query is empty', () => {
    component.onSearch('');
    expect(component.filteredBooks.length).toBe(2);
  });

  it('should sort books by author ascending', () => {
    component.filteredBooks = [...mockBooks]; // Simulate books loaded
    component.sortByAuthorAsc();
    expect(component.filteredBooks[0].author).toBe('Aaron');
    expect(component.filteredBooks[1].author).toBe('Zara');
  });

  it('should sort books by author descending', () => {
    component.filteredBooks = [...mockBooks]; // Simulate books loaded
    component.sortByAuthorDesc();
    expect(component.filteredBooks[0].author).toBe('Zara');
    expect(component.filteredBooks[1].author).toBe('Aaron');
  });

  it('should navigate to edit page with correct ISBN', () => {
    component.onEdit('123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', '123']);
  });

  it('should call deleteBookByISBN with correct ISBN', () => {
    component.onDelete('1');
    expect(mockBookService.deleteBookByISBN).toHaveBeenCalledWith('1');
  });
});
