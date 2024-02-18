fetch('js/backend.json')
.then(response => response.json())
.then(data=> {
    //salvar dados vindos do backend localmente
    //vamos usar um localstorage
    localStorage.setItem('produtos', JSON.stringify(data))
    console.log('Dados dos produtos salvos no localStorage');
    setTimeout(() => {
        $("#produtos").empty();

    data.forEach(produto => {
        var produtoHTML =`
        <div class="item-card">
         <a data-id="${produto.id}" href="/detalhes/" class="item">
 <div class="img-container">
  <img src="${produto.imagem}">
 </div>
 <div class="nomee-rating">
     <span class="color-gray">${produto.nome}</span>
     <span class="bold margin-right">
         <i class="ri-star-fill"></i>
     ${produto.rating}
     </span>
     <div class="price bold">${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</div>
     </a>
 </div>
        ` ;
        $("#produtos").append(produtoHTML)

     });
        
     $(".item").on('click', function() {
var id =$(this).attr('data-id');
localStorage.setItem('detalhe', id);
     });
}, 100);
    
    

})
.catch(error =>console.error('Erro ao fazer o catch dos dados: '+ error))

//ver qnts itens tem dentro do carrinho
setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho'));
    //alimentar o contador da sacola
    $('.btn-cart').attr('data-count', carrinho.length)
}, 300);