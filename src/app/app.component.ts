import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.invalidaProjectName], this.validateProjectNameAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl(null, Validators.required)
    });

    this.projectForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
  }

  onSaveProject() {
    console.log(this.projectForm.value);
    console.log("Project Name: " + this.projectForm.get('projectName'));
    this.projectForm.reset();
  }

  validateProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'superuser') {
          resolve({'mayBeNotSuperuser': true})
        } else {
          resolve(null);
        }
      }, 3000);
    })
    return promise;
  }
}
