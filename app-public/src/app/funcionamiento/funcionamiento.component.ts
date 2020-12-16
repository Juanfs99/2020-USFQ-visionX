import { Component, OnInit } from '@angular/core';
import { FuncionDataService } from '../funcion-data.service';

export class Objetos {
  label: string;
}

@Component({
  selector: 'app-funcionamiento',
  templateUrl: './funcionamiento.component.html',
  styleUrls: ['./funcionamiento.component.css']
})
export class FuncionamientoComponent implements OnInit {

  constructor(private FuncionDataService: FuncionDataService) { }
  titulo = 'Objetos Registrados'
  /*
  
  objetos: Objetos = {
    label: "Escritorio",
  }
  */
  public objetos: Objetos;

  private getObjects(): void {
    this.FuncionDataService
      .getObjects()
      .then(foundObjects => this.objetos = foundObjects);
  }
  ngOnInit(): void {
    this.getObjects();
  }

}
