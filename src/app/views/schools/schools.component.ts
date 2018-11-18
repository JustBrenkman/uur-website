import {Component, OnInit, ViewChild} from '@angular/core';
import {School} from '../../models/school';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SchoolsService} from '../../services/schools.service';

// const SCHOOLS: School[] = [
//   {abr: 'BYU', name: 'Brigham Young University'},
//   {abr: 'NB', name: 'Mt. Nebo'}
// ];

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'abr'];
  dataSource: MatTableDataSource<School>;
  SCHOOLS: School[] = [];
  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public schoolService: SchoolsService) {
    this.dataSource = new MatTableDataSource(this.SCHOOLS);
    this.getSchools();
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
}
