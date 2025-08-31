import { Component, inject, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// Angular Material
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Governorates } from '../../../Governorates/models/governorate.model';
import { CreateSchool } from '../../schools-models/schools.model';
import { SchoolsServices } from '../../services/schools.services';
import { GovernorateServices } from '../../../Governorates/services/governorate.services';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


export interface SwaggerSchoolModel {
  nameAr: string;
  province: string;
  city: string;
  needs: string[];
  managerName: string;
  headTeacherNumber: string;
  notes?: string;
}

/* ========= Pipe للفلترة كما في القالب المقترح ========= */
@Pipe({ name: 'filterStartsWith', standalone: true })
export class FilterStartsWithPipe implements PipeTransform {
  transform(list: string[] | null | undefined, query: string | null | undefined): string[] {
    if (!Array.isArray(list)) return [];
    const q = (query ?? '').toString().trim().toLowerCase();
    if (!q) return list;
    return list.filter(v => (v ?? '').toString().toLowerCase().startsWith(q));
  }
}
type GovernorateMin = Pick<Governorates, 'governorateId' | 'nameAr'>;

@Component({
  selector: 'app-add-school-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatAutocompleteModule,

    // Pipe المستقلة
    FilterStartsWithPipe,
  ],
  templateUrl: './add-school-dialog.component.html',
  styleUrls: ['./add-school-dialog.component.scss'],
})
export class AddSchoolDialogComponent implements OnInit {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  governorates: Governorates[] = []
  userId!: string;

  provinces: string[] = ['إدلب', 'حلب', 'دمشق', 'حمص', 'حماة'];

  school: CreateSchool = {
    nameAr: '',
    city: '',
    description: '',
    estimatedRenovationCost: 0,
    governorateId: '',
    headTeacherName: '',
    headTeacherNumber: 0,
    nameEn: 'www',
    needs: [],
    userId: '',
  };

  // خيارات جاهزة للّوازم (Autocomplete)
  commonNeeds: string[] = [
    'دفاتر', 'أقلام', 'مساطر', 'حقائب', 'ألوان', 'طباشير', 'سبورات', 'كتب منهج', 'أحبار طابعات'
  ];

  // للـ chips
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // موافقة صحة البيانات
  confirmAccurate = false;
  chipInputValue: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddSchoolDialogComponent>,
    private schoolsService: SchoolsServices,
    private governorateServices: GovernorateServices
  ) {
    this.governorates = this.data.governorates;
    this.userId = this.data.userId;
  }

  filteredGovernorates: GovernorateMin[] = [];
  ngOnInit(): void {
    this.filteredGovernorates = (this.governorates ?? []).map(
      ({ governorateId, nameAr }) => ({ governorateId, nameAr })
    );
  }

  /* ========= Chips: إضافة/إزالة ========= */
  addNeed(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.school.needs.includes(value)) {
      this.school.needs.push(value);
    }

    if (event.chipInput) {
      event.chipInput.clear();
    }
  }

  removeNeed(index: number): void {
    if (index >= 0) {
      this.school.needs.splice(index, 1);
    }
  }

  /* ========= Autocomplete لإضافة عنصر ========= */
  // إذا استخدمت (optionSelected)
  addNeedFromSelected(e: MatAutocompleteSelectedEvent): void {
    const value = (e?.option?.value || '').toString().trim();
    if (value && !this.school.needs.includes(value)) {
      this.school.needs.push(value);
    }
  }
  // وإذا استخدمت (onSelectionChange) كما في القالب المقترح
  addNeedFromOption(selected: boolean, opt: string): void {
    if (!selected) return;
    const value = (opt || '').trim();
    if (value && !this.school.needs.includes(value)) {
      this.school.needs.push(value);
    }
  }

  /* ========= مساعدة: نسخ رقم الهاتف ========= */
  copyPhone(val?: string) {
    // if (!val) return;
    // navigator.clipboard?.writeText(val).catch(() => {});
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave(form?: any) {
    this.school.userId = '81bf7251-f15b-4492-8d32-19144689bed9';

    if (!this.school.needs.length) {
      const ctrl = form?.controls?.['needsRequired'];
      ctrl?.markAsTouched();
      ctrl?.updateValueAndValidity();
      return;
    }
    this.dialogRef.close(this.school);
  }

  blockMinusAndExp(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    if (k === '-' || k === 'e' || k === '+') {
      e.preventDefault();
    }
  }

  clampNonNegative() {
    const v = Number(this.school?.estimatedRenovationCost);
    if (Number.isFinite(v) && v < 0) {
      this.school.estimatedRenovationCost = 0;
    }
  }

  preview: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result)
        this.school.schoolImageBase64 = reader.result as any || ''; // Base64
        this.preview = reader.result;

        console.log(this.school.schoolImageBase64)
      };
      reader.readAsDataURL(file);
    }
  }
}
