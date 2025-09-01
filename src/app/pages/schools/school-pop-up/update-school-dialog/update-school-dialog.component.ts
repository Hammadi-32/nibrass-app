import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Governorates } from '../../../Governorates/models/governorate.model';
import { UpdateSchool } from '../../schools-models/schools.model';
import { SchoolsServices } from '../../services/schools.services';

export interface UpdateSchoolDialogData {
  schoolData: UpdateSchool;
  governorates?: Governorates[];
}

/* ========= Pipe بسيطة للفلترة ========= */
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
  selector: 'app-update-school-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

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

    // Pipe
    FilterStartsWithPipe,
  ],
  templateUrl: './update-school-dialog.component.html',
  styleUrls: ['./update-school-dialog.component.scss'],
})
export class UpdateSchoolDialogComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  governorates: Governorates[] = [];
  filteredGovernorates: GovernorateMin[] = [];

  // خيارات جاهزة للّوازم (Autocomplete)
  commonNeeds: string[] = [
    'دفاتر', 'أقلام', 'مساطر', 'حقائب', 'ألوان', 'طباشير', 'سبورات', 'كتب منهج', 'أحبار طابعات'
  ];
  chipInputValue = '';

  // النموذج التفاعلي
  form!: FormGroup;

  get needs(): FormArray {
    return this.form.get('needs') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateSchoolDialogComponent>,
    private schoolsService: SchoolsServices,
    @Inject(MAT_DIALOG_DATA) public data: UpdateSchoolDialogData
  ) {
    this.governorates = this.data.governorates!
  }



  ngOnInit(): void {
    const s = this.data?.schoolData ?? ({} as UpdateSchool);
    console.log(s)
    // بناء الـ FormGroup
    this.form = this.fb.group({
      schoolId: [s.schoolId ?? ''],
      nameAr: [s.nameAr ?? '', Validators.required],
      nameEn: [s.nameEn ?? ''],
      city: [s.city ?? '', Validators.required],
      description: [s.description ?? ''],
      estimatedRenovationCost: [
        s.estimatedRenovationCost ?? 0,
      ],
      governorateId: [s.governorteId ?? '', Validators.required],
      headTeacherName: [s.headTeacherName ?? '', Validators.required],
      headTeacherNumber: [
        s.headTeacherNumber ?? '',
        [
          Validators.required,
        ]
      ],
      isRequirementsMet: [!!s.isRequirementsMet],
      confirmAccurate: [false, Validators.requiredTrue],

      // مصفوفة اللوازم
      needs: this.fb.array([]),
    });

    // تعبئة اللوازم القادمة
    (s.needs ?? []).forEach(n => this.needs.push(new FormControl(n)));

    // المحافظات (إن كانت ممرّرة من الخارج)
    if (Array.isArray(this.data?.governorates) && this.data.governorates.length) {
      this.governorates = this.data.governorates;
    }
    this.filteredGovernorates = (this.governorates ?? []).map(
      ({ governorateId, nameAr }) => ({ governorateId, nameAr })
    );
  }

  // --- أزرار التحكم ---
  onCancel() {
    this.dialogRef.close();
  }

  onSave() {

    // نبني الكائن النهائي من الـ FormGroup
    const val = this.form.getRawValue();
    const result: UpdateSchool = {
      schoolId: val.schoolId,
      nameAr: val.nameAr,
      nameEn: val.nameEn,
      city: val.city,
      description: val.description,
      estimatedRenovationCost: Number(val.estimatedRenovationCost) || 0,
      governorteId: val.governorateId,
      headTeacherName: val.headTeacherName,
      headTeacherNumber: val.headTeacherNumber,
      isRequirementsMet: !!val.isRequirementsMet,
      isApproved: true,
      needs: [...(val.needs ?? [])],
    };
    // console.log(result)
    this.dialogRef.close(result);
  }

  // --- لوازم (Chips / Autocomplete) ---
  addNeed(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.needs.value.includes(value)) {
      this.needs.push(new FormControl(value));
    }
    event.chipInput?.clear();
    this.chipInputValue = '';
  }

  removeNeed(index: number): void {
    if (index >= 0) this.needs.removeAt(index);
  }

  addNeedFromSelected(e: MatAutocompleteSelectedEvent): void {
    const value = (e?.option?.value || '').toString().trim();
    if (value && !this.needs.value.includes(value)) {
      this.needs.push(new FormControl(value));
    }
  }

  addNeedFromOption(selected: boolean, opt: string): void {
    if (!selected) return;
    const value = (opt || '').trim();
    if (value && !this.needs.value.includes(value)) {
      this.needs.push(new FormControl(value));
    }
  }

  // --- مساعدات ---
  copyPhone(val?: string) {
    if (!val) return;
    navigator.clipboard?.writeText(val).catch(() => { });
  }

  blockMinusAndExp(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    if (k === '-' || k === 'e' || k === '+') e.preventDefault();
  }

  clampNonNegative() {
    const ctrl = this.form.get('estimatedRenovationCost');
    const v = Number(ctrl?.value);
    if (Number.isFinite(v) && v < 0) ctrl?.setValue(0);
  }
}
