import { Component, OnInit } from '@angular/core';
import { GovernorateServices } from '../../services/governorate.services';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Governorates } from '../../models/governorate.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-governorates',
  imports:
    [
      CommonModule,
      RouterModule
    ],
  templateUrl: './governorates.component.html',
  styleUrl: './governorates.component.scss',
  standalone: true
})
export class GovernoratesComponent implements OnInit {

  governorates: Governorates[] = [];

  constructor(private governorateServices: GovernorateServices) { }
  
  ngOnInit(): void {
    // this.getAllGovernorates()
  }

  getAllGovernorates() {
    this.governorateServices.getListGovernorates().subscribe(res => {
      this.governorates = res;
    })
  }
}
