import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Candidato } from './models/candidato';
import { CandidatoService } from './services/candidato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'angular-http';

  candidato = {} as Candidato;
  candidatos!: Candidato[];

  constructor(private candidatoService: CandidatoService) { }

  ngOnInit() {
    this.getCandidatos();
  }

  // defini se um candidato será criado ou atualizado
  saveCandidato(form: NgForm) {
    if (this.candidato.id !== undefined) {
      this.candidatoService.updateCandidato(this.candidato).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.candidatoService.saveCandidato(this.candidato).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obter todos os candidatos
  getCandidatos() {
    this.candidatoService.getCandidatos().subscribe((candidatos: Candidato[]) => {
      this.candidatos = candidatos;
    });
  }

  //deleta um candidato
  deleteCandidato(candidato: Candidato) {
    this.candidatoService.deleteCandidato(candidato).subscribe(() => {
      this.getCandidatos();
    });
  }

  //copia o candidato para ser editado
  editCandidato(candidato: Candidato) {
    this.candidato = { ...candidato };
  }

  //limpa o formulário
  cleanForm(form: NgForm) {
    this.getCandidatos();
    form.resetForm();
    this.candidato = {} as Candidato;
  }

}
