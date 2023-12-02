import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss', 'forms.responsive.component.scss']
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filtredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitService: FilterUnitsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });

    this.unitService.getAll().subscribe(data => {
      this.results = data.locations
      this.filtredResults = data.locations;
    });
  }

  onSubmit(): void {
    let {showClosed, hour} = this.formGroup.value
    this.filtredResults = this.filterUnitService.filter(
      this.results,
      showClosed,
      hour
    )
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
