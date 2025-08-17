import { Component, OnInit } from '@angular/core';
import { GovernorateServices } from '../../services/governorate.services';
import { CommonModule } from '@angular/common';
import { Governorates, JsonData } from '../../models/governorate.model';
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
  fakeGovernorates: any = new JsonData;


  constructor(private governorateServices: GovernorateServices) { }

  ngOnInit(): void {
    this.getAllGovernorates();
  }

  getAllGovernorates() {
    this.governorates = this.fakeGovernorates.FakeGovernorates
    this.governorateServices.getListGovernorates().subscribe(res => {
      // this.governorates = res;
      this.governorates.forEach(g => {
        g.imageSrc = this.convertToDataUrl(g.governorateImageUrl?.base64String!, g.governorateImageUrl?.contentType!)

      })
    })
  }

  convertToDataUrl(fileContents: string, contentType: string): string {
    return `data:${contentType};base64,${fileContents}`;
  }
}
