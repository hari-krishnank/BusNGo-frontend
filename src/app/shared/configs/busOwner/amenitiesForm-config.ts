import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const amenitiesModalFields: ModalFormField[] = [
    { name: 'title', placeholder: 'Enter Title', type: 'text', errors: [] },
    {
        name: 'icon',
        placeholder: 'Select Icon',
        type: 'iconSelect',
        errors: [
            
        ],
        options: [
            { value: 'wifi', label: 'Wi-Fi', iconClass: 'fas fa-wifi' },
            { value: 'ac', label: 'Air Conditioning', iconClass: 'fas fa-snowflake' },
            { value: 'tv', label: 'TV', iconClass: 'fas fa-tv' },
            { value: 'waterbottle', label: 'Water Bottle', iconClass: 'fas fa-wine-bottle' },
            { value: 'charging', label: 'Charging Station', iconClass: 'fas fa-charging-station' },
            { value: 'recliner', label: 'Recliner Seats', iconClass: 'fas fa-chair' },
            { value: 'readingLight', label: 'Reading Light', iconClass: 'fas fa-lightbulb' },
            { value: 'blanket', label: 'Blanket', iconClass: 'fas fa-layer-group' },
            { value: 'pillow', label: 'Pillow', iconClass: 'fas fa-bed' },
            { value: 'snacks', label: 'Snacks', iconClass: 'fas fa-cookie' },
            { value: 'headphones', label: 'Headphones', iconClass: 'fas fa-headphones' }    
        ]
    },
];