import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// Angular Material
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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

export interface SchoolModel {
  name: string;
  province: string;
  city: string;
  needs: string[];
  managerName: string;
  managerPhone: string;
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

/* ===================== المكوّن ===================== */
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
export class AddSchoolDialogComponent {
  // محافظات (مؤقتًا)
  provinces: string[] = ['إدلب', 'حلب', 'دمشق', 'حمص', 'حماة'];

  // نموذج البيانات
  school: SchoolModel = {
    name: '',
    province: '',
    city: '',
    needs: [],
    managerName: '',
    managerPhone: '',
    notes: '',
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

  constructor(private dialogRef: MatDialogRef<AddSchoolDialogComponent>) {}

  /* ========= Chips: إضافة/إزالة ========= */
  addNeed(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.school.needs.includes(value)) {
      this.school.needs.push(value);
    }
    // تنظيف الحقل
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
    if (!val) return;
    navigator.clipboard?.writeText(val).catch(() => {});
  }

  /* ========= حفظ/إلغاء ========= */
  onCancel() {
    this.dialogRef.close();
  }

  onSave(form?: NgForm) {
    if (!this.school.needs.length) {
    // علّم الحقل الخفي كـ touched لعرض رسالة الخطأ
    const ctrl = form?.controls?.['needsRequired'];
    ctrl?.markAsTouched();
    ctrl?.updateValueAndValidity();
    return;
  }
    this.dialogRef.close(this.school);
  }
}
