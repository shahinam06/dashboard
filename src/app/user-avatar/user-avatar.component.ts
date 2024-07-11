import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  template: `
    <div class="avatar" [style.background-color]="backgroundColor">
      <span class="initials">{{ getInitials(name) }}</span>
    </div>
  `,
  styles: [`
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
      color: #fff;
    }
  `]
})
export class UserAvatarComponent {
  @Input()
  name!: string;
  backgroundColor: string;

  constructor() {
    // Generate a random background color for each avatar
    this.backgroundColor = this.getRandomColor();
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
    return initials;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
