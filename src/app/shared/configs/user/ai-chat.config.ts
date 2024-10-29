import { ChatTopic } from "../../../core/models/user/ai-chat.interface";
import { FormField } from "../../../core/models/user/form-fields.interface";

export const aiChatField: FormField[] = [
    {
        name: 'message',
        type: 'text',
        placeholder: 'Type your message...',
        errors: [
            { type: 'required', message: 'Message is required' }
        ]
    }
]

export const CHAT_TOPICS: ChatTopic[] = [
    {
        id: 'technical',
        title: 'Technical Issues',
        icon: 'computer',
        description: 'Need some technical help?',
        systemContext: `You are a technical support assistant for BusNGo, a bus booking platform. 
                       Focus on helping users with technical issues like login problems, app functionality, 
                       payment processing, and website navigation. Provide clear step-by-step solutions.`,
        quickActions: [
            { label: 'Login Problems', message: 'I cannot log into my account. What should I do?' },
            { label: 'Payment Failed', message: 'My payment transaction failed. How can I resolve this?' },
            { label: 'App not Loading', message: 'The BusNGo app is not loading properly. How can I fix this?' },
            { label: 'Reset Password', message: 'How do I reset my password?' }
        ],
        keywords: ['login', 'password', 'payment', 'error', 'app', 'website', 'access', 'account', 'reset', 'technical', 'loading', 'slow', 'problem', 'issue', 'bug', 'crash'],
        invalidResponse: 'I can only assist with technical issues related to BusNGo platform. For this query, please select the appropriate help topic or rephrase your question about technical issues.'
    },
    // {
    //     id: 'referral',
    //     title: 'BusNGo Referral Help',
    //     icon: 'group',
    //     description: 'Questions about our referral program?',
    //     systemContext: `You are a referral program specialist for BusNGo, a bus booking platform. 
    //                    Help users understand how the referral system works, how to earn and redeem referral benefits, 
    //                    and resolve referral-related issues.`,
    //     quickActions: [
    //         { label: 'How Referrals Work', message: 'Can you explain how the referral program works?' },
    //         { label: 'Referral Rewards', message: 'What rewards do I get for referring friends?' },
    //         { label: 'Track Referrals', message: 'How can I track my referral status?' },
    //         { label: 'Missing Rewards', message: 'I haven\'t received my referral reward. What should I do?' }
    //     ],
    //     keywords: ['refer', 'referral', 'reward', 'friend', 'invite', 'bonus', 'points', 'credit', 'commission', 'share', 'track', 'status', 'earn'],
    //     invalidResponse: 'I can only assist with referral program related queries. For this query, please select the appropriate help topic or rephrase your question about referrals.'
    // },
    {
        id: 'booking',
        title: 'New Bus Booking Help',
        icon: 'event_seat',
        description: 'Need help with your booking?',
        systemContext: `You are a booking specialist for BusNGo, a bus booking platform. 
                       Assist users with the booking process, seat selection, cancellation policies, 
                       and booking-related inquiries.`,
        quickActions: [
            { label: 'Booking Process', message: 'How do I book a bus ticket?' },
            { label: 'Seat Selection', message: 'How does seat selection work?' },
            { label: 'Cancellation Policy', message: 'What is the cancellation policy?' },
            { label: 'Modify Booking', message: 'How can I modify my booking?' }
        ],
        keywords: ['book', 'booking', 'ticket', 'seat', 'cancel', 'modify', 'change', 'refund', 'schedule', 'bus', 'route', 'time', 'date', 'passenger', 'journey'],
        invalidResponse: 'I can only assist with booking related queries. For this query, please select the appropriate help topic or rephrase your question about bookings.'
    },
    // {
    //     id: 'offers',
    //     title: 'Offers',
    //     icon: 'local_offer',
    //     description: 'Learn about current offers and deals',
    //     systemContext: `You are an offers specialist for BusNGo, a bus booking platform. 
    //                    Help users understand available offers, coupon codes, discounts, and how to 
    //                    apply them to their bookings.`,
    //     quickActions: [
    //         { label: 'Current Offers', message: 'What are the current offers available?' },
    //         { label: 'Apply Coupon', message: 'How do I apply a coupon code?' },
    //         { label: 'Offer Terms', message: 'What are the terms and conditions for offers?' },
    //         { label: 'Special Discounts', message: 'Are there any special discounts for frequent travelers?' }
    //     ],
    //     keywords: ['offer', 'discount', 'coupon', 'code', 'deal', 'sale', 'price', 'special', 'promotion', 'savings', 'cashback', 'terms'],
    //     invalidResponse: 'I can only assist with offers and discounts related queries. For this query, please select the appropriate help topic or rephrase your question about offers.'
    // }
];