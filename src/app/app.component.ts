import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required],
        this.forbiddenProjectNameAsync
      ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null),
    });

  }

  /* forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenName.indexOf(control.value) !== -1) {
      return { 'projectNameIsForbidden': true };
    }
    return null;
  } */

  forbiddenProjectNameAsync(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
  onSubmit() {
    /* this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    ); */
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }
}
