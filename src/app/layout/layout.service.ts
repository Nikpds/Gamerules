import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Counter } from '../app.models';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LayoutService {
    private homeUrl = environment.api + 'home';

    constructor(
        private auth: AuthService
    ) { }

    getCounters(): Observable<Counter> {
        return this.auth.get(this.homeUrl + '/counters')
            .map((res: Response) => res.json())
            .catch((error: string) => Observable.throw(error || 'Server error'));
    }


}
