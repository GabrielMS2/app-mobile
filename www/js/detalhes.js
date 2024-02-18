//recuperar o id detalhe do locastorage
var id = parseInt(localStorage.getItem('detalhe'));
//pegar os produtos do localstorage
var produtos = JSON.parse(localStorage.getItem('produtos'));

var item = produtos.find(produto => produto.id === id);

if(item){
    //tem o item
    console.log('Produto encontrado ', item);
    //alimentar com os valores do item
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html( item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews +" Reviews");
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' }));
    $("#precopromo-detalhe").html(item.preco_promocional .toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' }));
    var tabelaDetalhes= $("#tabdetalhes");

    item.detalhes.forEach(detalhe => {
        var linha =`
        <tr>
        <td>${detalhe.caracteristica}</td>
        <td>${detalhe.detalhes}</td>
      </tr>
        `;
        tabelaDetalhes.append(linha)
    });

}else {//n tem o item
    console.log('Produto não encontrado')
}
var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
//função adicionar ao carrinho
function adicionarAoCarrinho(item, quantidade) {
    var itemNoCarrinho = carrinho.find(c=> c.item.id === item.id);
    if(itemNoCarrinho){
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item =itemNoCarrinho.quantidade *item.preco_promocional
    }
    else{
        carrinho.push({
          item: item,
          quantidade: quantidade,
          total_item: quantidade * item.preco_promocional
        })
    }

    //ATUALIZAR O LOCALSTORAGE DO CARRINHO
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    
}
//apos clicar no add ao carrinho
$(".add-cart").on('click', function () {
//add ao carrinho
    adicionarAoCarrinho(item, 1);

   var toastCenter = app.toast.create({
        text: `${iem.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
});

toastCenter.open();
});
