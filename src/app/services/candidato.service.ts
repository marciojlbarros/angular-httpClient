import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Candidato } from '../models/candidato';

@Injectable({
  providedIn: 'root'
})

export class CandidatoService {
  
  //injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  //api rest fake
  url = 'http://localhost:3000/candidatos';
  
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/json' })
  }

  // Obtem todos os candidatos 
  getCandidatos(): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>(this.url)}

  // Obtem um candidato pelo id
  getCandidatoById(id: number): Observable<Candidato> {
    return this.httpClient.get<Candidato>(this.url + '/' + id)
  }

  // Salvar um candidato
  saveCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.post<Candidato>(this.url,candidato)
  }

  //atualiza um candidato
  updateCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.put<Candidato>(this.url + '/' + candidato.id,candidato)
  }

  // deleta um candidato
  deleteCandidato(candidato: Candidato) {
    return this.httpClient.delete<Candidato>(this.url + '/' + candidato.id)
  }

// Manipulação de erros
handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Erro ocorreu no lado do client
    errorMessage = error.error.message;
  } else {
    // Erro ocorreu no lado do servidor
    errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(() => new Error(errorMessage));
};

}
