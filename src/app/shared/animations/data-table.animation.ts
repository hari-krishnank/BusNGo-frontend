import { trigger, state, style, animate, transition } from '@angular/animations';

export const tableAnimation = trigger('tableAnimation', [
    transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition('* => void', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ])
])

export const rowAnimation = trigger('rowAnimation', [
    transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ])
])