import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { f } from "../../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private title = inject(Title);
  private meta  = inject(Meta);

  contact = {
    email: 'hamzaalsaado0@gmail.com',
    phone: '+963 932 588 670',
    location: 'ادلب، سوريا',
    hours: 'الأحد – الخميس: 9 ص – 5 م',
    whatsapp: '+963932588670',
    twitter: '@Hamza_Al_Saado',
    facebook: 'share/1AF1ev8gwQ/',
  };

  phoneHref = '';
  waHref = '';

  constructor() {
    const phone = this.contact.phone ?? '';
    this.phoneHref = 'tel:' + phone.replace(/\s+/g, '');

    const wa = this.contact.whatsapp ?? '';
    this.waHref = 'https://wa.me/' + wa.replace(/\D+/g, '');

    this.title.setTitle('من نحن - نِبراس');
    this.meta.updateTag({ name: 'description', content: 'قصتنا ورسالتنا وفريق نِبراس.' });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
  }
}
