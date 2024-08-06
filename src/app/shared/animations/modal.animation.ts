import { trigger, state, style, animate, transition } from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
    state('void', style({
        transform: 'scale(0.7)',
        opacity: 0
    })),
    state('*', style({
        transform: 'scale(1)',
        opacity: 1
    })),
    transition('void => *', [
        animate('300ms ease-out')
    ]),
    transition('* => void', [
        animate('200ms ease-in')
    ])
]);