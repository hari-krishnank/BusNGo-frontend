import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { AiChatComponent } from '../ai-chat/ai-chat.component';
import { CHAT_TOPICS } from '../../../shared/configs/user/ai-chat.config';
import { ChatTopic } from '../../../core/models/user/ai-chat.interface';

@Component({
  selector: 'app-help-users',
  standalone: true,
  imports: [UsernavComponent, CommonModule, MatIconModule, MatButtonModule, AiChatComponent, FooterComponent],
  templateUrl: './help-users.component.html',
  styleUrl: './help-users.component.css'
})
export class HelpUsersComponent {
  showChat = false;
  topics = CHAT_TOPICS;
  selectedTopic?: ChatTopic;

  openChat(topicId: string) {
    this.selectedTopic = this.topics.find(topic => topic.id === topicId);
    this.showChat = true;
  }

  closeChat() {
    this.showChat = false;
    this.selectedTopic = undefined;
  }
}