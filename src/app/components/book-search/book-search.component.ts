import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class SearchComponent {
  @Output() searchQuery = new EventEmitter<string>(); 

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;  
    this.searchQuery.emit(input.value.toLowerCase()); 
  }
}
