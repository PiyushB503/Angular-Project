// src/app/services/api-book.service.ts
import { Injectable } from '@angular/core';
import { Book } from '../models/books';
import { API_CONFIG } from '../config/api-config';

@Injectable({ providedIn: 'root' })
export class ApiBookService {
  private baseUrl = API_CONFIG.BASE_URL;

  async fetchBooks(): Promise<Book[]> {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();

      const books: Book[] = data.items?.map((item: any) => {
        const info = item.volumeInfo;
        return {
          title: info.title || 'Untitled',
          author: info.authors?.[0] || 'Unknown',
          publication_date: info.publishedDate || 'N/A',
          isbn: info.industryIdentifiers?.[0]?.identifier || 'N/A',
          genre: info.categories?.[0] || 'General'
        };
      }) ?? [];

      return books;
    } catch (err) {
      console.error('API fetch failed:', err);
      return [];
    }
  }
}
