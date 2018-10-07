import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ConexaoProvider, Ingredientes } from '../../providers/conexao/conexao';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { ComprasProvider } from '../../providers/compras/compras';
import { RotasProvider } from '../../providers/rotas/rotas';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pao-ervas',
  templateUrl: 'pao-ervas.html',
})
export class PaoErvasPage {
  public pagina = this.rota.pgNome;
  public titulo = this.rota.compraIngrediente;
  public imagem = this.rota.img;
  public receitasIni: string = 'Clique em editar e escreva a técnica de preparo do ' + this.pagina[7];
  public conteudoCard;
  public textoEdicao;
  public conteudoField;
  public textField;
  public btnEdit;
  public btnSalv;
  public btnAtualizar;
  public logo = 'assets/imgs/logo-2.png';
  public chave: string;
  public chaveCompra: string;
  public chaveReceita: string = 'Tecnica de preparo ' + this.pagina[7];
  public totCompras: any;
  public valorCompras: Ingredientes;
  public totIngredientes = [];
  public valorIngredientes: Ingredientes;
  constructor(public navCtrl: NavController, public navParams: NavParams, public conexao: ConexaoProvider, public compraProvider: ComprasProvider, public receitaProvider: ReceitasProvider, public toast: ToastController, public rota: RotasProvider, public loadingCtrl: LoadingController) {
    this.valorCompras = new Ingredientes();
    this.valorIngredientes = new Ingredientes();
    this.chave = 'Pao de Ervas';
    this.chaveCompra = 'Compras';
    this.btnSalv = 'none';
    this.textField = 'none';
    this.conteudoCard = this.receitasIni;
  }
  ionViewDidLoad() {
    this.detectaMudancaReceita();
    this.detectMudancaIngrediente();
    this.consultaCompras(this.chaveCompra);
    this.calculosValoresIngredientes();
  }
  ionViewDidEnter() {
    this.detectaMudancaReceita();
    this.detectMudancaIngrediente();
    this.consultaCompras(this.chaveCompra);
    this.calculosValoresIngredientes();
  }
  valorIngrediente(chave: string) {//PEGA OS VALORES RELATIVOS AOS INGREDIENTE DO BANCO
    return this.receitaProvider.verIngredientes(chave);
  }
  valorReceita(chave: string) {//PEGA OS VALORES RELATIVOS AOS INGREDIENTE DO BANCO
    return this.receitaProvider.verReceitas(chave);
  }
  salvarIngrediente(chave: string, compras: Ingredientes) {//SALVA OS VALORES RELATIVOS AOS INGREDIENTE DO BANCO
    this.receitaProvider.salvarIngredientes(chave, compras);
    this.presentLoading('Atualizando');
  }
  salvarReceita(chave: string, receita: string) {//SALVA OS VALORES RELATIVOS AOS INGREDIENTE DO BANCO
    this.receitaProvider.salvarReceitas(chave, receita);
    this.mensagem('Atualizado com sucesso!');
  }
  //METODOS AUXILIARES DE EXPERIENCIA
  editarReceita() {
    this.conteudoField = 'none';
    this.textField = 'block';
    this.btnEdit = 'none';
    this.btnSalv = 'block';
  }
  posEdicaoReceita() {
    this.detectaMudancaReceita();
    this.conteudoField = 'block';
    this.textField = 'none';
    this.btnEdit = 'block';
    this.btnSalv = 'none';
  }
  detectaMudancaReceita(){
        //RECUPERA OS DADOS RELATIVO A TECNICA DE PREPARO DA RECEITA
        this.valorReceita(this.chaveReceita).then((resultado: any) => {
          if (resultado.receita == undefined || resultado.receita == "") {//RECUPEROU E REPASSOU O DADO MESMO COM ESSE 'ERRO'
            this.salvarReceita(this.chaveReceita, this.receitasIni);
            this.conteudoCard = this.receitasIni;
          } else {
            this.conteudoCard = resultado.receita;//RECUPEROU E REPASSOU O DADO MESMO COM ESSE 'ERRO'
          }
        })
          .catch((e) => {
            console.error(e);
          })
  }
  detectMudancaIngrediente(){
    //RECUPERA OS DADOS RELATIVO AOS INGREDIENTES DA RECEITA
    this.valorIngrediente(this.chave).then((resultado: Ingredientes) => {
      if (resultado == undefined) {
        this.salvarIngrediente(this.chave, this.valorCompras);
      } else {
        this.valorCompras = resultado;
      }
    })
      .catch((e) => {
        console.error(e);
      })
  }
  consultaCompras(chave: string){
    this.valorIngrediente(chave).then((precos: Ingredientes)=>{
      this.valorIngredientes = precos;
    })
    .catch((e)=>{
      console.log("erro ao consultar os precos das compras " + e);
    })
  }
    //CALCULA OS VALORES DOS INGREDIENTES USADOS E DA O VALOR EM R$
    calculosValoresIngredientes(){
      var aux0 = this.valorCompras.farinhaTrigo * this.valorIngredientes.precoFarinhaTrigo / Number(this.valorIngredientes.farinhaTrigo * 1000);
      this.totIngredientes[0] = aux0.toFixed(2);
      var aux1 = this.valorCompras.acucar * this.valorIngredientes.precoAcucar / Number(this.valorIngredientes.acucar * 1000);
      this.totIngredientes[1] = aux1.toFixed(2);
      var aux2 = this.valorCompras.sal * this.valorIngredientes.precoSal / Number(this.valorIngredientes.sal * 1000);
      this.totIngredientes[2] = aux2.toFixed(2);
      var aux3 = this.valorCompras.cebola * this.valorIngredientes.precoCebola / Number(this.valorIngredientes.cebola * 1000);
      this.totIngredientes[3] = aux3.toFixed(2);
      var aux4 = this.valorCompras.alho * this.valorIngredientes.precoAlho / Number(this.valorIngredientes.alho * 1000);
      this.totIngredientes[4] = aux4.toFixed(2);
      var aux5 = this.valorCompras.oleo * this.valorIngredientes.precoOleo / Number(this.valorIngredientes.oleo * 1000);
      this.totIngredientes[5] = aux5.toFixed(2);
      var aux6 = this.valorCompras.leite * this.valorIngredientes.precoLeite / Number(this.valorIngredientes.leite * 1000);
      this.totIngredientes[6] = aux6.toFixed(2);
      var aux7 = this.valorCompras.ovo * this.valorIngredientes.precoOvo / this.valorIngredientes.ovo;
      this.totIngredientes[7] = aux7.toFixed(2);
      var aux8 = this.valorCompras.fermentoBiologico * this.valorIngredientes.precoFermentoBiologico /this.valorIngredientes.fermentoBiologico;
      this.totIngredientes[8] = aux8.toFixed(2);
      var aux9 = this.valorCompras.cheiroVerde * this.valorIngredientes.precoCheiroVerde /this.valorIngredientes.cheiroVerde;
      this.totIngredientes[9] = aux9.toFixed(2);
      var aux10 = this.valorCompras.manjericao * this.valorIngredientes.precoManjericao /this.valorIngredientes.manjericao;
      this.totIngredientes[10] = aux10.toFixed(2);
      var aux11 = this.valorCompras.alecrim * this.valorIngredientes.precoAlecrim /this.valorIngredientes.alecrim;
      this.totIngredientes[11] = aux11.toFixed(2);
      var aux12 = this.valorCompras.oregano * this.valorIngredientes.precoOregano /this.valorIngredientes.oregano;
      this.totIngredientes[12] = aux12.toFixed(2);
      var aux13 = this.valorCompras.embalagem * this.valorIngredientes.precoEmbalagem /this.valorIngredientes.embalagem;
      this.totIngredientes[13] = aux13.toFixed(2);
      
      //CALCULA O VALOR R$ TOTAL USADO NA RECEITA
      var aux = aux0 + aux1 + aux2 + aux3 + aux4 + aux5 + aux6 + aux7 + aux8 + aux9 + aux10 + aux11 + aux12 + aux13;
      this.totCompras = aux.toFixed(2);
    }
  //MOSTRA O TOASTER CONFIRMANDO O SALVAMENTO DA RECEITA
  mensagem(msg: string) {
    this.toast.create({
      message: msg,
      duration: 3000,
      position: 'center'
    }).present();
  }
  //ATUALIZA O CARD COM OS DADOS E MOSTRA ANIMACAO DE ATUALIZACAO
  presentLoading(msg: string) {
    const loader = this.loadingCtrl.create({
      content: msg,
      duration: 1000
    });
    loader.present().then(()=>{
      this.calculosValoresIngredientes();
    })
  }
}