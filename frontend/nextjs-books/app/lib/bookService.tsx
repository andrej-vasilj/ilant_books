import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';


class BookService {
	bookResults: Subject = new Subject();

	search(query: string, startIndex: number = 0) {
		console.log('Querying books for: ' + query);
		this.bookResults.next({isLoading: true});
		ajax.getJSON('http://0.0.0.0/search/?query_string=' + query + '&start_index=' + startIndex).subscribe({
		  next: value => {
		  	console.log(value);
		  	this.bookResults.next({isLoading: false, ...value});
		  },
		  error: err => {
		  	console.log(err);
		  	this.bookResults.next({isLoading: false, error: err?.detail || 'Something went wrong!'})
		  }
		});
	}
}


// Not sure what the best way of achieving a singleton service is with react/next.js, but
// I'll try exporting an instance of the class here. Angular would have dependency injection take care of this
// for me
const bookService = new BookService();
export default bookService;
