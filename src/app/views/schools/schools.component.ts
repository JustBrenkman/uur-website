import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {School, SchoolFull} from '../../models/school';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolsService} from '../../services/schools.service';
import {SelectionModel} from '@angular/cdk/collections';

// const SCHOOLS: School[] = [
//   {abr: 'BYU', name: 'Brigham Young University'},
//   {abr: 'NB', name: 'Mt. Nebo'}
// ];

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'abr'];
  schoolsFullDisplayedColumns: string[] = ['timestamp', 'id', 'school_name', 'address', 'city', 'state',
    'zipcode', 'phone', 'district', 'actions'];
  dataSource: MatTableDataSource<School>;
  schoolsSource: MatTableDataSource<SchoolFull>;
  SCHOOLS: School[] = [];
  SCHOOLSFULL: SchoolFull[] = [];
  isLoading = false;
  isSchoolsFullLoading = false;
  selection = new SelectionModel<SchoolFull>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public schoolService: SchoolsService) {
    this.dataSource = new MatTableDataSource(this.SCHOOLS);
    this.schoolsSource = new MatTableDataSource(this.SCHOOLSFULL);
    this.getSchools();
    this.getSchoolsFull();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSchools() {
    this.isLoading = true;
    this.schoolService.getSchools().subscribe((data: School[]) => {this.SCHOOLS = data;
      console.log(this.SCHOOLS);
      // this.dataSource = new MatTableDataSource<School>(this.SCHOOLS);
      this.dataSource.data = this.SCHOOLS;
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  getSchoolsFull() {
    this.isSchoolsFullLoading = true;
    this.schoolService.getSchoolFull().subscribe((data: SchoolFull[]) => {
      this.SCHOOLSFULL = data;
      console.log(data);
      this.schoolsSource.data = this.SCHOOLSFULL;
      this.isSchoolsFullLoading = false;
    });
  }

  applyFilterSchoolsFull(value: string) {
    this.schoolsSource.filter = value.trim().toLocaleLowerCase();
    if (this.schoolsSource.paginator) {
      this.schoolsSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.schoolsSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.schoolsSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.schoolsSource.paginator = this.paginator;
    this.schoolsSource.sort = this.sort;
  }
}
