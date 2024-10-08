## 1. Introduction

#### If you need the Korean documentation, please refer to the README(ko).md

- This is a table library implemented using `tanstack/react-table` and `jotai`.
- It can be used in `React`-based projects.
- Provides table column/data settings, sorting, pagination, and custom table data functionality.
  <span style="color: darkgray;"> The sorting feature is limited to columns named "No".</span>
- It is designed as a headless UI, allowing for flexible styling and customization.

## 2. Installation

- using npm : `npm install rex-table`
- using yarn : `yarn add rex-table`

## 3. Dependencies (Libraries Used)

##### \* Version reference date: September 2024

- It is recommended to use the library with the versions specified or higher.
- The versions of each library are based on the most stable versions at the time of module development.

#### 1) Dependencies

- @tanstack/react-table (^8.20.5)
- jotai (^2.9.3)
- jotai-immer (^18.3.1)

#### 2) PeerDependencies

- react (^18.3.1)
- react-dom (^18.3.1)

## 4. Structure (Directories and Files)

<pre>
📦src
 ┣ 📂atom
 ┃ ┗ 📜subRowContentsAtom.ts
 ┣ 📂components
 ┃ ┣ 📂TableBody
 ┃ ┃ ┣ 📜DefaultSubRow.tsx
 ┃ ┃ ┣ 📜TableBodyCell.tsx
 ┃ ┃ ┣ 📜TableBodyRow.tsx
 ┃ ┃ ┗ 📜TableSubRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂TableContainer
 ┃ ┃ ┗ 📜TableContainer.tsx
 ┃ ┣ 📂TableFooter
 ┃ ┃ ┣ 📜TablePageNumbers.tsx
 ┃ ┃ ┣ 📜TablePageSizeSelect.tsx
 ┃ ┃ ┗ 📜TablePagination.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂TableHeader
 ┃ ┃ ┣ 📜TableHeaderCell.tsx
 ┃ ┃ ┣ 📜TableHeaderRow.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hook
 ┃ ┣ 📜useSubRowContent.ts
 ┃ ┗ 📜useTable.ts
 ┣ 📂provider
 ┃ ┗ 📜TableProvider.tsx
 ┣ 📂type
 ┃ ┗ 📜type.ts
 ┣ 📂util
 ┃ ┣ 📜content.util.ts
 ┃ ┣ 📜body.util.ts
 ┃ ┣ 📜footer.util.ts
 ┃ ┗ 📜header.util.ts
 ┗ 📜index.ts
</pre>

#### 1) TableProvider

- `TableProvider` wraps `TableHeader`, `TableBody`, and `TableFooter`, serving to pass `props` to each component.
- The `props` to be passed when calling the component are as follows.
  | Props | Type | Explain | Required |
  | ---------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | `SubRowComponent` | `ReactNode` | Used when customizing the `SubRow`, pass the component directly for customization. | `optional` |
  | `useParentRowUi` | `boolean` | Determines whether to use the parent row UI when using `SubRow`. | `optional` |
  | `rowClickEvent` | `function` | Function triggered when a row in the `Table` is clicked. | `optional` |
  | `subRowClickEvent` | `function` | Function triggered when a row in the `SubRow` is clicked. <br/><br/>\* Applicable only when `useParentRowUi` is set to `true`. <br/> If `SubRowComponent` is provided, the click event can be handled directly within the component. | `optional` |
  | `subRowCellClickEvent` | `function` | Function triggered when a cell in the `SubRow` is clicked. <br/><br/>\* Applicable only when `useParentRowUi` is set to `true`. <br/> If `SubRowComponent` is provided, the click event can be handled directly within the component. | `optional` |

<br/>

#### 2) TableHeader

- This component renders the column headers of the table.
- You can control `layer`, `rowSpan`, and `colSpan` via the `header option`.
- The `props` to be passed when calling the component are as follows.
  | Props | Type | Explain | Required |
  | -------------- | ------------------ | -------------------------------------------------------------------------- | ---------- |
  | `table` | `Table<TData>` | The table data and method-related instance returned by the `useTable` hook. | `required` |
  | `style` | `CSSProperties` | Set CSS properties via `inline Style`. | `optional` |
  | `headerOption` | `HeaderOptionType` | Defines detailed properties related to rendering the `header`. (Detailed description attached below) | `optional` |

<br/>

- The `header option` type is as follows.
  | Property | Type | Explain |
  | ------------- | -------- | ----------------------------------------------------------------------- |
  | `accessorKey` | `string` | The `key` value mapping the `header` with the `header option`. |
  | `layer` | `number` | Determines on which row the `header` starts. |
  | `rowSpan` | `number` | Determines the height the `header` occupies based on the specified `layer`. |
  | `colSpan` | `number` | Determines the width the `header` occupies. |

<br/>

#### 3) TableBody

- This component renders the actual table data and is composed of rows (`TableBodyRow`) and the cells that make up those rows (`TableBodyCell`).
- The `props` to be passed when calling the component are as follows.
  | Props | Type | Explain | Required |
  | ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | `table` | `Table<TData>` | The table data and method-related instance returned by the `useTable` hook. | `required` |
  | `style` | `CSSProperties` | Set CSS properties via `inline Style`. | `optional` |
  | `subRowStyle` | `CSSProperties` | Customize `CSS` for `subRow` if necessary. <br/><br/> \* Applicable only when `useParentRowUi` is set to `true`. <br/> If `SubRowComponent` is provided, customization can be handled directly within the component. | `optional` |

#### 4) TableFooter

- This component handles pagination functionality and can be used optionally when needed.
- It consists of two main components:

  1. `TablePageSizeSelect`: A component that allows changing the number of contents displayed per page.
  2. `TablePagination`: Handles the page number changing functionality.
     <br/>

- The `props` to be passed when calling the component are as follows.
  | Props | Type | Explain | Required |
  | --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------- |
  | `pagination` | `PaginationState` | Pagination-related state returned by the `useTable` hook. | `required` |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | Pagination state management function returned by the `useTable` hook. | `required` |
  | `totalPageNum` | `number` | Total number of pages returned by the `useTable` hook. | `required` |
  | `pageSizeList` | `Array<number>` | List of options for the number of contents displayed per page. The default values are `[10, 15, 20, 25, 30]`. | `optional` |

<br/>

#### 5) useTable

- A custom hook that returns the data to be passed as `props` for `TableHeader`, `TableBody`, and `TableFooter` components.
- The `props` to be passed when calling the hook are as follows.
  | Props | Type | Explain | Required |
  | -------------- | --------------------- | ----------------------------------------------- | ---------- |
  | `data` | `Array<T>` | The data to be rendered in the table body. | `required` |
  | `columns` | `Array<ColumnDef<T>>` | The data used to configure the table columns. | `required` |
  | `isPagination` | `boolean` | Determines whether pagination is enabled. | `optional` |

<br/>

- The values returned by the hook are as follows.
  | Returned Value | Type | Explain |
  | ---------------- | ------------------- | -------------------------------------------- |
  | `table` | `Table<TData>` | The instance object used for table settings. Used as a `prop` in `TableHeader` and `TableBody`. |
  | `pagination` | `PaginationState` | Pagination-related state. Used as a `prop` in `TableFooter`. |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | Pagination state management function. Used as a `prop` in `TableFooter`. |

<br/>

#### 6) useSubRowContent

- A custom hook that returns functions to retrieve and modify data used in the `SubRow`.
- Internally, `jotai atom` is used to store values.
- The values returned by the hook are as follows.
  | Returned Value | Explain |
  | --------------------------- | ------------------------------------------------------------------------------------------------- |
  | `getSubRowContentOfEntire` | A function that retrieves the data for the entire `SubRow`. |
  | `setSubRowContentOfEntire` | A function that modifies the data for the entire `SubRow`. |
  | `getSubRowContentOfSelected` | A function that retrieves the `SubRow` data for a specific row. |
  | `setSubRowContentOfSelected` | A function that modifies the `SubRow` data for a specific row. |

<br/>

#### 7) Type

- `Type` definitions used for `props` data, custom hooks, and event handler parameters.
  | Type | Explain |
  | ------------------ | -------------------------------------------------------------------- |
  | `ColumnDef` | `Type` related to the `columns` parameter of `useTable`. |
  | `Row` | `Type` related to `Row` data used in `TableBodyRow`. |
  | `Cell` | `Type` related to `Cell` data used in `TableBodyCell`. |
  | `HeaderOptionType` | `Type` related to the `headerOption` prop passed to `TableHeader`. |

  <br/>

## 5. Usage (Sample Code)

- To be added

## 6. issue
