// angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../services/employee/employee.service';
import { BasicService, Basic } from '../../../services/basic/basic.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Output() save = new EventEmitter<EmployeeService.Employee>();

  jobRoles: Basic[] = [];
  workLocations: Basic[] = [];
  genders: Basic[] = [];
  states: Basic[] = [];

  loading: boolean = false;
  employeeForm: FormGroup;
  saving: boolean = false;
  registrationRef: string;
  toastService: any;
  employeeId: string;

  additionalForm: FormGroup;
  showCard: boolean;

  selectedFile: File = null;
  employeeDocuments: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private basicService: BasicService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.registrationRef = this.generateRegistration();
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.loadEmployeeData(this.employeeId);
    }

    this.loadJobRole();
    this.loadWorkLocation();
    this.loadStates();
    this.loadGenders();

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      registration: [{ value: this.registrationRef, disabled: true }, Validators.required ],
      birthday: [''],
      municipality: [''],
      state: [''],
      gender_id: [''],
      marital_state_id: [''],
      job_role_id: ['', Validators.required],
      workspace_id: ['', Validators.required],
      contacts: this.fb.array([]),
      document_upload: [null]
    });
  }

  loadJobRole(): void {
    this.loading = true;
    this.basicService.getRoles()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.jobRoles = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  loadWorkLocation(): void {
    this.loading = true;
    this.basicService.getWorkLocation()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.workLocations = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  loadStates(): void {
    this.loading = true;
    this.basicService.getStates()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.states = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  loadGenders(): void {
    this.loading = true;
    this.basicService.getGenders()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.genders = data;
        },
        error: (e) => this.toastService.error(e),
      });
  }

  addContact() {
    this.showCard = true;

    const contact = this.employeeForm.get('contacts') as FormArray;
    contact.push(this.fb.group({
      phone: ['', Validators.required],
      cell_phone: ['', Validators.required],
      email: ['', Validators.required]
    }));
  }

  removeContact(index: number) {
    this.additionalForms.removeAt(index);
  }

  onFileChange(event) {
    // if (event.target.files.length > 0) {
    //   this.selectedFile = event.target.files[0];
    //   this.employeeForm.patchValue({
    //     document_upload: this.selectedFile
    //   });
    // }

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
  
      const fileControl = this.employeeForm.get('document_upload');
      if (fileControl) {
        fileControl.setValue(this.selectedFile);
      }
    }
  }

  get additionalForms(): FormArray {
    const array = this.employeeForm.get('contacts');
    if (!array) {
      throw new Error('FormArray not initialized');
    }
    return array as FormArray;
  }

  public async validateForm(form) {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return false;
    }
  
    form.classList.add('was-validated');
    return true;
  }

  public async onSave() {
    const formElement = document.querySelector('.requires-validation');
    
    if (!this.validateForm(formElement)) {
      return; 
    }

    const formData = this.employeeForm.getRawValue();
    this.loading = true;

    const payload = {
      employee: formData,
    };

    try {
      await this.employeeService.saveEmployee(payload);

      this.loading = false;
      this.toastr.success('Funcionário castrado com sucesso!', 'Funcionário');
      this.router.navigate(['/funcionarios']);
    } catch (error) {
      this.toastr.error('Funcionário não foi cadastrado!', 'Funcionário');
      console.log(error);
      this.loading = false;
    }
  }

  public async onUpdate() {
    const formData = this.employeeForm.getRawValue();
    this.loading = true;

    try {
      await this.employeeService.updateEmployee(this.employeeId, formData);

      this.loading = false;
      this.toastr.success('Funcionário atualizado com sucesso!', 'Funcionário');
      this.router.navigate(['/funcionarios']);
    } catch (error) {
      this.toastr.error('Funcionário não foi atualizado!', 'Funcionário');
      console.log(error);
      this.loading = false;
    }
  }

  public async loadEmployeeData(employeeId: string) {
    try {
      const employee = await this.employeeService.getOneEmployee(employeeId);
      const formattedBirthday = new Date(employee.birthday).toISOString().split('T')[0];

      this.employeeForm.patchValue({
        name: employee.name,
        registration: employee.registration,
        birthday: formattedBirthday,
        municipality: employee.municipality,
        state: employee.state,
        marital_state_id: employee.marital_state.id,
        gender_id: employee.gender.id,
        job_role_id: employee.job_role.id,
        workspace_id: employee.workspace.id,
      });

      const contactsFormArray = this.employeeForm.get('contacts') as FormArray;
      contactsFormArray.clear();

      employee.contacts.forEach(contact => {
        const contactFormGroup = this.fb.group({
          id: [contact.id],
          phone: [contact.phone, Validators.required],
          cell_phone: [contact.cell_phone, Validators.required],
          email: [contact.email, Validators.required]
        });
        contactsFormArray.push(contactFormGroup);
      });

      this.employeeDocuments = employee.document_upload || [];
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  cancelEmployee(): void {
    this.router.navigate(['/funcionarios']);
  }

  generateRegistration(): string {
    return 'MAT' + Math.floor(Math.random() * 1000);
  }

  getFormData(): any {
    const formData = this.employeeForm.getRawValue();
    return formData.codigo_ref;
  }
}