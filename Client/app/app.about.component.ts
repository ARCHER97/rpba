import { Component } from '@angular/core';

@Component({
  selector: 'about',
  template: `
    <div class="col-sm-12">
        <h2>
            Hello!<br>
            This is good site.
        </h2>
    </div>
    `,
    styleUrls: ['../app/stylefiles/app.about.component.css']
})
export class AboutComponent {
}