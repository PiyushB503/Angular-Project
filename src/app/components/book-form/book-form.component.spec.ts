import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockBookService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockBookService = {
      getBookByISBN: jasmine.createSpy('getBookByISBN').and.callFake((isbn: string) => ({
        isbn,
        title: 'Mock Book',
        author: 'Test Author',
        publication_date: '2022-01-01',
        genre: 'Fiction'
      })),
      updateBookByISBN: jasmine.createSpy('updateBookByISBN'),
      addBook: jasmine.createSpy('addBook')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [BookFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => key === 'isbn' ? '1234567890' : null
            })
          }
        },
        { provide: BookService, useValue: mockBookService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load book data in edit mode when ISBN is present', () => {
    expect(component.editMode).toBeTrue();
    expect(component.title).toBe('Mock Book');
    expect(component.author).toBe('Test Author');
    expect(component.publication_date).toBe('2022-01-01');
    expect(component.genre).toBe('Fiction');
    expect(component.isbn).toBe('1234567890');
  });

  it('should call updateBookByISBN on submit in edit mode', () => {
    component.onSubmit();
    expect(mockBookService.updateBookByISBN).toHaveBeenCalledWith('1234567890', jasmine.objectContaining({
      title: 'Mock Book',
      author: 'Test Author'
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should call addBook on submit when not in edit mode', () => {
    component.editMode = false;
    component.title = 'New Title';
    component.author = 'New Author';
    component.publication_date = '2023-01-01';
    component.isbn = '0987654321';
    component.genre = 'Non-fiction';

    component.onSubmit();
    expect(mockBookService.addBook).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'New Title',
      author: 'New Author'
    }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should navigate back to list on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list']);
  });
});
