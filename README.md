# Technical test for Onfly (onfly-test)

Web interface for searching, listing filtering and describing hotels for the tech test on Onfly.

Projeto apenas para teste técnico. Utila-se o framework Quasar para interface front-end e adquiri os dados de informações de arquiovs JSON providos.
```
O teste prático foi realizado de acordo com o documento, desenvolvendo um SPA capaz de buscar, listar, filtrar e detalhar hotéis.
Os seguintes requisitos foram aplicados:
    * Utilizado o Vue.js;
    * Utiilizado o framework Quasar para a UI;
    * Protótipo de tela utilizado de orientação;
    * Autocomplete nos destinos quando buscados;
    * Filtros de ordenação em:
        - Recomendados; (Por falta do atributo “deals” nos arquivos .json providos, utilizei o campo “favorite” para a filtragem.)
        - Melhor Avaliados;
        - Nome.
    * Aplicado Scroll infinito na listagem;
    * Componentização aplicada.
Além disso, também optei por utilizar TypeScript com interfaces para os dados providos.

A visualização de detalhamentos do hotel foi feito na opção de Modal.

Ao listar os hotéis, percebi que o campo “deals” estava vazio. Por isso, utilizei do ID convertido para valor numérico de reais para preencher os campos de valores.
```
## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```
