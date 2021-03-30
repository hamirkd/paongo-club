import { Component, OnInit } from '@angular/core';
import { TitreModel } from 'app/models/titre.model.model';
import { TitreModelService } from 'app/services/titre-model.service';
import { TitreService } from 'app/services/titre.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-titres-list',
  templateUrl: './titres-list.component.html',
  styleUrls: ['./titres-list.component.css']
})
export class TitresListComponent implements OnInit {

  
  titres: TitreModel[] = [];
  constructor(private titreModelService: TitreModelService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.listeUtilisateur();
  }
  listeUtilisateur() {
    this.titreModelService.findAllTitres().subscribe(data => {
      // this.titres = data as User[];
      this.titres = Object.keys(data).map(function (personNamedIndex) {
        let items = data[personNamedIndex];
        return items;
      })
    })
  }

}
