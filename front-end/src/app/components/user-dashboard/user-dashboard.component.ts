import { Component , OnInit} from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      tap(() => console.log('Fetching users...')),
      catchError(err => {
        console.error('Error fetching users', err);
        return of([]);
      })
    );

  searchControl = new FormControl('');
  filteredUsers$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(searchTerm => this.users$.pipe(
      map(users => users.filter(user => 
        user.name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        user.username.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        user.email.toLowerCase().includes((searchTerm || '').toLowerCase())
      ))
    ))
  );

  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.users$.subscribe(() => this.loading = false);
  }
}
