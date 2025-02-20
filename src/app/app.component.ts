import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';



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

  constructor(firestore: AngularFireModule) {
    
  }
}
