import { Component } from '@angular/core';
import { MoviesService } from '../theMovieDB/movies.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MoviesService]
})
export class Tab2Page {

  public lista_filmes = new Array<any>();
  public page:number = 1;


  constructor(public movieService:MoviesService, public loadingCtrl: LoadingController) {
  }


  ionViewDidEnter(){
    this.efeitoLoading();
    this.carregaPagina();
  }


  async efeitoLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando Filmes',
      duration: 2000,
      spinner:'lines-sharp'
    });

    loading.present();
  }

  handleRefresh(event) {
    this.page = 1;
    this.carregaPagina();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  }

  efeitoScrollInfinito(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.page++;
      this.carregaPagina();

    }, 500);
  }


  public carregaPagina(){

    this.movieService.getPopularMovies(this.page,'pt-br').subscribe(
      data => {
          // quando dá bom
          const response = data as any;
          if(this.page==1){
            this.lista_filmes = response.results;
            console.log(this.lista_filmes);
          } else {
            this.lista_filmes = this.lista_filmes.concat(response.results);
            console.log(this.lista_filmes);
          }

      },

      error => {
        // quando dá ruim
        console.log('deu ruim na hora de chamar a minha api popular');

      }


    );

  }

}
