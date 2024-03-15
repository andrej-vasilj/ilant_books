import { ReplaySubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';


class BookService {
	bookResults: ReplaySubject = new ReplaySubject();

	search(query: string, startIndex: number = 0) {
		console.log('Querying books for: ' + query);
		console.log('Starting at entry: ' + startIndex);

		if (query.length === 0) {
			this.bookResults.next({isLoading: false, query, startIndex, items: []});
			return;
		}

		this.bookResults.next({isLoading: true});

		ajax.getJSON(process.env.BASE_URL + '/search/?query_string=' + query + '&start_index=' + startIndex).subscribe({
		  next: results => {
		  	this.bookResults.next({isLoading: false, query, startIndex, ...results});
		  },
		  error: err => {
		  	console.log(err);
		  	this.bookResults.next({isLoading: false, query, startIndex, error: err?.detail || 'Something went wrong!'});
		  }
		});
	}
}


// Not sure what the best way of achieving a singleton service is with react/next.js, but
// I'll try exporting an instance of the class here. Angular would have dependency injection take care of this
// for me
const bookService = new BookService();
export default bookService;
