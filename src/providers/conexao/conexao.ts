import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConexaoProvider {
    //atributos
    private imagens = ['assets/imgs/beliscao-goiabada.jpg', 'assets/imgs/biscoito-amanteigado.jpg', 'assets/imgs/pao-caseiro.jpg', 'assets/imgs/pao-batata.jpg', 'assets/imgs/pao-beterraba.jpg', 'assets/imgs/pao-cenoura.jpg', 'assets/imgs/pao-ervas.jpg', 'assets/imgs/pao-forma.jpg', 'assets/imgs/pao-fuba.jpg', 'assets/imgs/pao-maca.jpg', 'assets/imgs/pao-mandioca.jpg', 'assets/imgs/pao-milho.jpg', 'assets/imgs/pao-integral.jpg', 'assets/imgs/rosca-estrela.jpg'];
    private receitaPg = ['Beliscão de goiaba', 'Biscoito amanteigado', 'Pão caseiro', 'Pão de batata com catupiry', 'Pão de beterraba', 'Pão de cenoura', 'Pão de ervas', 'Pão de forma tradicional', 'Pão de fubá recheado com goiabada', 'Pão de maça', 'Pão de mandioca', 'Pão de milho', 'Pão integral', 'Rosca estrela'];
    private receitas = ['Receita de : Beliscao de goiabada', 'Receita de : Biscoito amanteigado', 'Receita de : Pão caseiro', 'Receita de : Pão de batata com catupiry', 'Receita de : Pão de beterraba', 'Receita de : Pão de cenoura', 'Receita de : Pão de ervas', 'Receita de : Pão de forma tradicional', 'Receita de : Pão de fubá recheado com goiabada', 'Receita de : Pão de maça', 'Receita de : Pão de mandioca', 'Receita de : Pão de milho', 'Receita de : Pão integral', 'Receita de : Rosca estrela'];
    public titulo = 'ini';
    public conteudo = 'ini';
    public image = 0;

    //construtor
    constructor(private storage: Storage) {
    }
    //metodos especiais
    getTitulo(){
      return this.titulo;
    }
    getConteudo(){
      return this.conteudo;
    }
    getImage(){
      return this.image;
    }
    setAtributos(val) {
        // Or to get a key/value pair
        this.storage.get(this.receitaPg[val]).then((receitas: string) => {
            this.titulo = this.receitaPg[val];//trocar por outra var com numero da pagina escohlida
            this.conteudo = receitas;
            this.imagens[this.image];
            console.log('Resultado: ', this.conteudo);
        });
    }
    setBanco(val) {
        // set a key/value
        this.storage.set(this.receitaPg[val], this.receitas[val]);
    }
    //metodos acessores

}