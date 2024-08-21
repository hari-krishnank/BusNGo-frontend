import { Validators } from "@angular/forms";
import { FormField } from "../../../core/models/user/form-fields.interface";

export const boardingFields = (trip: any): FormField[] => [
    {
        name: 'boardingPoint',
        label: 'Boarding Point',
        type: 'select',
        placeholder: 'Select Boarding Point',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'Boarding point is required' }],
        options: [
            {
                value: trip.startFrom._id,
                label: `${trip.startFrom.location} ( ${trip.route.schedule.startFrom} )`,
            },
        ],
    },
];

export const droppingFields = (trip: any): FormField[] => [
    {
        name: 'droppingPoint',
        label: 'Dropping Point',
        type: 'select',
        placeholder: 'Select Dropping Point',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'Boarding point is required' }],
        options: [
            ...trip.route?.additionalStops?.map((stop: any) => ({
                value: stop.stop._id,
                label: `${stop.stop.location} (${stop.reachingTime})`,
            })),
             {
                value: trip.endTo._id,
                label: `${trip.endTo.location} (${trip.route.schedule.end})`,
            },
        ],
    },
];