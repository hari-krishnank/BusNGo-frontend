import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GeminiService } from '../../../core/services/user/ai-chat.service';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { aiChatField } from '../../../shared/configs/user/ai-chat.config';
import { ChatMessage, ChatTopic, QuickAction } from '../../../core/models/user/ai-chat.interface';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, FormComponent],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.css'
})
export class AiChatComponent implements OnInit {
  @Input() selectedTopic!: ChatTopic;
  @Output() goBack = new EventEmitter<void>();
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: ChatMessage[] = [];
  showQuickActions = true;
  isLoading = false;
  messageForm: FormGroup;
  formFields: FormField[] = aiChatField
  quickActions: QuickAction[] = [];

  constructor(private geminiService: GeminiService, private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  ngOnInit() {
    this.messages.push({
      content: 'Hello! I\'m your BusNGo support assistant. How can I help you today?',
      type: 'bot',
      timestamp: new Date()
    });
    this.quickActions = this.selectedTopic.quickActions;
  }

  private isTopicRelated(message: string): boolean {
    const lowercaseMessage = message.toLowerCase();
    return this.selectedTopic.keywords.some(keyword =>
      lowercaseMessage.includes(keyword.toLowerCase())
    );
  }

  async sendMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;

      if (message.trim()) {
        this.messages.push({
          content: message,
          type: 'user',
          timestamp: new Date()
        });

        this.showQuickActions = false;
        this.messageForm.reset();

        if (!this.isTopicRelated(message)) {
          this.messages.push({
            content: this.selectedTopic.invalidResponse,
            type: 'bot',
            timestamp: new Date()
          });
        } else {
          this.messages.push({
            content: '',
            type: 'bot',
            timestamp: new Date(),
            isLoading: true
          });

          try {
            const response = await this.getBotResponse(message);
            this.messages = this.messages.filter(m => !m.isLoading);
            this.messages.push({
              content: response,
              type: 'bot',
              timestamp: new Date()
            });
          } catch (error) {
            this.messages = this.messages.filter(m => !m.isLoading);
            this.messages.push({
              content: 'I apologize, but I encountered an error. Please try again.',
              type: 'bot',
              timestamp: new Date()
            });
          }
        }

        setTimeout(() => this.scrollToBottom(), 100);
      }
    }
  }

  handleQuickAction(action: string) {
    this.messageForm.patchValue({ message: action });
    this.sendMessage();
  }

  onFormSubmit(formData: any) {
    this.sendMessage();
  }

  private async getBotResponse(message: string): Promise<string> {
    try {
      const prompt = `${this.selectedTopic.systemContext}\n\nUser: ${message}\nAssistant:`;
      const response = await this.geminiService.generateResponse(prompt).toPromise();
      return response.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error getting bot response:', error);
      throw error;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}