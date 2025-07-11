import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './book-search.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent] // since it's standalone
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit lowercase search query when onSearch is called', () => {
    spyOn(component.searchQuery, 'emit');

    // Create a fake input event
    const inputElement = document.createElement('input');
    inputElement.value = 'TeSt';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    component.onSearch(event);

    expect(component.searchQuery.emit).toHaveBeenCalledWith('test');
  });
});
