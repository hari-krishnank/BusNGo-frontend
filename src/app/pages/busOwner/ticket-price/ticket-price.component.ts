import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ticketsColumns } from '../../../shared/data/busOwner/ticketPrice/ticketPrice-column';
import { ticketPriceModalFields } from '../../../shared/configs/busOwner/ticketPriceForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FleetTypeService } from '../../../core/services/busOwner/fleet-type/fleet-type.service';
import { RouteService } from '../../../core/services/busOwner/add-routes/add-route.service';
import { TicketPriceService } from '../../../core/services/busOwner/ticket-price/ticket-price.service';

@Component({
  selector: 'app-ticket-price',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './ticket-price.component.html',
  styleUrl: './ticket-price.component.css'
})
export class TicketPriceComponent implements OnInit {
  ticketsData: any[] = [];
  ticketsColumns = ticketsColumns;
  modalFields: ModalFormField[] = ticketPriceModalFields;
  ticketForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private ticketPriceService: TicketPriceService,
    private fleetTypeService: FleetTypeService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.createTicketForm();
    this.loadTicketPrices();
    this.loadFleetTypes();
    this.loadRoutes();
  }

  createTicketForm() {
    this.ticketForm = this.fb.group({
      fleetType: ['', Validators.required],
      route: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  loadTicketPrices() {
    this.ticketPriceService.getTicketPrices().subscribe(
      (data: any[]) => {
        this.ticketsData = data.map(ticket => ({
          ...ticket,
          fleetType: ticket.fleetType && ticket.fleetType.name ? ticket.fleetType.name : 'N/A',
          route: ticket.route && ticket.route.name ? ticket.route.name : 'N/A'
        }));
      },
      (error) => {
        console.error('Error loading ticket prices:', error);
      }
    );
  }

  loadFleetTypes() {
    this.fleetTypeService.getAllFleetTypes().subscribe(
      (fleetTypes) => {
        const fleetTypeField = this.modalFields.find(field => field.name === 'fleetType');
        if (fleetTypeField) {
          fleetTypeField.options = fleetTypes.map(ft => ({ value: ft._id, label: ft.name }));
        }
      },
      (error) => {
        console.error('Error loading fleet types:', error);
      }
    );
  }

  loadRoutes() {
    this.routeService.getRoutes().subscribe(
      (routes) => {
        const routeField = this.modalFields.find(field => field.name === 'route');
        if (routeField) {
          routeField.options = routes.map(r => ({ value: r._id, label: r.name }));
        }
      },
      (error) => {
        console.error('Error loading routes:', error);
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Ticket Price',
        fields: this.modalFields,
        form: this.ticketForm,
        submitButtonText: 'Add Ticket Price'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveTicketPrice(result);
      }
    });
  }

  saveTicketPrice(formData: any) {
    const ticketPriceData: any = {
      fleetType: formData.fleetType,
      route: formData.route,
      price: formData.price,
      status: 'Active'
    };

    this.ticketPriceService.addTicketPrice(ticketPriceData).subscribe(
      (response) => {
        console.log('New ticket price added:', response);
        this.loadTicketPrices();
      },
      (error) => {
        console.error('Error adding ticket price:', error);
      }
    );
  }
}
