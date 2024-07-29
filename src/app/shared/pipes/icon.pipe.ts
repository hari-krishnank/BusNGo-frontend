import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'icon',
  standalone: true
})
export class IconPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(iconName: string): SafeHtml {
    console.log('Icon name received:', iconName);
    const iconMap: { [key: string]: string } = {
      'wifi': 'fas fa-wifi',
      'ac': 'fas fa-snowflake',
      'tv': 'fas fa-tv',
      'waterbottle': 'fas fa-wine-bottle',
      'charging': 'fas fa-charging-station',
      'recliner': 'fas fa-chair',
      'readingLight': 'fas fa-lightbulb',
      'blanket': 'fas fa-layer-group',
      'pillow': 'fas fa-bed',
      'snacks': 'fas fa-cookie',
      'headphones': 'fas fa-headphones'
    };

    const iconClass = iconName && iconMap[iconName] ? iconMap[iconName] : 'fas fa-cube';
    console.log(iconClass);
    return this.sanitizer.bypassSecurityTrustHtml(`<i class="${iconClass}"></i>`);
  }
}