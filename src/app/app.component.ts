import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ringoffire';
  // firestore: Firestore = inject(Firestore);
  // items$: Observable<any[]>;

  // constructor() {
  //   const aCollection = collection(this.firestore, 'items')
  //   this.items$ = collectionData(aCollection);
  // }
}
