import { Pipe, PipeTransform } from "@angular/core";
import { Subject, debounceTime, distinctUntilChanged, switchMap, of } from "rxjs";

@Pipe({
  name: "searchFilter",
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  private subject = new Subject<string>();

  transform(inputList: any[], filterString: string, filterProperty?: string): any[] {
    this.subject.next(filterString); // Push the filter string to the subject

    if (!inputList || !filterString) {
      return inputList;
    }

    filterString = filterString.toLowerCase(); // Convert to lowercase for case-insensitive filtering

    return inputList.filter((item) => {
      if (filterProperty) {
        if (typeof item[filterProperty] === "string") {
          return item[filterProperty].toLowerCase().includes(filterString);
        }
      } else {
        if (typeof item === "string") {
          return item.toLowerCase().includes(filterString);
        }
      }
      return item;
    });
  }

  constructor() {
    this.subject
      .pipe(
        debounceTime(300), // Adjust the debounce time as needed (in milliseconds)
        distinctUntilChanged(),
        switchMap((filterString) => of(filterString))
      )
      .subscribe();
  }
}
