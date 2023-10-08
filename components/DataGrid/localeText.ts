import { GridLocaleText } from "@mui/x-data-grid"

export const localeText: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: 'Sem linhas',
  noResultsOverlayLabel: 'Nenhum resultado encontrado.',
  
  // Density selector toolbar button text
  toolbarDensity: 'Densidade',
  toolbarDensityLabel: 'Densidade',
  toolbarDensityCompact: 'Compactar',
  toolbarDensityStandard: 'Padrão',
  toolbarDensityComfortable: 'Confortável',

  // Columns selector toolbar button text
  toolbarColumns: 'Colunas',
  toolbarColumnsLabel: 'Selecione as colunas',

  // Filters toolbar button text
  toolbarFilters: 'Filtros',
  toolbarFiltersLabel: 'Mostrar filtros',
  toolbarFiltersTooltipHide: 'Ocultar filtros',
  toolbarFiltersTooltipShow: 'Mostrar filtros',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Baixar como CSV',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Localizar coluna',
  columnsPanelTextFieldPlaceholder: 'Título da coluna',
  columnsPanelDragIconLabel: 'Reordenar coluna',
  columnsPanelShowAllButton: 'Mostre tudo',
  columnsPanelHideAllButton: 'Esconda tudo',

  // Filter panel text
  filterPanelAddFilter: 'Adicionar filtro',
  filterPanelDeleteIconLabel: 'Excluir',
  filterPanelOperator: 'Operadores',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Valor do filtro',

  // Filter operators text
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'é igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'é depois',
  filterOperatorOnOrAfter: 'é em ou após',
  filterOperatorBefore: 'é antes',
  filterOperatorOnOrBefore: 'é em ou antes',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',
  filterOperatorIsAnyOf: 'é qualquer um',


  // Filter values text
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',

  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuFilter: 'Filtro',
  columnMenuHideColumn: 'Esconder',
  columnMenuUnsort: 'Não ordenar',
  columnMenuSortAsc: 'Classificar por ASC',
  columnMenuSortDesc: 'Classificar por DESC',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total rows footer text
  footerTotalRows: 'Total de linhas:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Seleção caixa de seleção',

  // Boolean cell text
  booleanCellTrueLabel: 'verdadeiro',
  booleanCellFalseLabel: 'falso',

  // Actions cell more text
  //actionsCellMore: 'more',

  // Used core components translation keys
  MuiTablePagination: {
    labelRowsPerPage: 'Linhas por página:',
    labelDisplayedRows: ({ from, to, count }) => {
      return `${from}-${to} de ${count !== -1 ? count : `mais do que ${to}`}`
    }
  },
}