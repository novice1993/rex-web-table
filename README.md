## 1. Introduction

**If you need documentation in Korean, please refer to README(ko).md.**

- This is a table library implemented using `tanstack/react-table`.
- It can be used in projects based on `React`.
- It provides features such as column/data configuration for tables, pagination, and table data customization.
- It is designed as a Headless UI, allowing for custom styling.

## 2. Quick Start

### Installation

- using npm: `npm install rex-web-table`
- using yarn: `yarn add rex-web-table`

### CSS Import

- To apply hover styles for rows and sub-rows, import the provided CSS file:

```typescript
/** This will ensure that the `hoverColor` for rows and sub-rows is applied correctly when using the library. **/
import "rex-web-table/src/style/style.css";
```

### Example

```typescript
const Table = () => {
  // 1. Define the data type for each row in the table
  interface Example {
    no: number;
    name: string;
  }

  // 2. Define the column structure of the table
  const columns: ColumnDef<Example>[] = [
    {
      accessorKey: "no", // Key mapped to data
      header: "No.", // Column header
      size: 10, // Column size (optional)
    },
    {
      accessorKey: "name",
      header: "Name", // Column header
      size: 90,
    },
  ];

  // 3. Define the data to display in the table
  const data: Array<Example> = [
    {
      no: 1,
      name: "kim",
    },
    {
      no: 2,
      name: "park",
    },
  ];

  // 4. Call the useTable hook to generate the table and pagination data
  const { table, pagination, setPagination, totalPageNum } = useTable({
    data, // Table data
    columns, // Table columns
    isPagination: true, // Apply pagination
  });

  // 5. Render the table using the provided components (TableProvider, TableHeader, TableBody, TableFooter)
  return (
    <div>
      <TableProvider>
        <TableHeader table={table} /> {/* Render table header */}
        <TableBody table={table} /> {/* Render table body */}
      </TableProvider>

      {/* Render footer with pagination controls */}
      <TableFooter
        pagination={pagination}
        setPagination={setPagination}
        totalPageNum={totalPageNum}
      />
    </div>
  );
};

export default Table;
```

<br/>

## 3. API Reference

### 3.1 TableProvider

- The `TableProvider` wraps `TableHeader`, `TableBody`, and handles passing `props` to the components.
  | Props | Type | Description | Required |
  |-----------------------|--------------|------------------------------------------------------------------------------------------------------------------|-----------|
  | `useParentRowUi` | `boolean` | Determines whether to inherit the parent's row UI when using `SubRow`. Inherits parent UI if `true`. | `optional`|
  | `SubRowComponent` | `ReactNode` | Custom component for `SubRow`. | `optional`|
  | `subRowContents` | `Array<object[]>` | Data used in `SubRow`. | `optional`|
  | `rowClickEvent` | `function` | Function triggered when a table row is clicked. | `optional`|
  | `cellClickEvent` | `function` | Function triggered when a table cell is clicked. | `optional`|
  | `subRowClickEvent` | `function` | Function triggered when a sub-row is clicked. Works only if `useParentRowUi` is `true`. | `optional`|
  | `subRowCellClickEvent` | `function` | Function triggered when a sub-row cell is clicked. Works only if `useParentRowUi` is `true`. | `optional`|
  | `borderLeftNone` | `boolean` | Controls whether the left border of the table is displayed. Useful with `left nav bar`. | `optional`|
  | `borderTopNone` | `boolean` | Controls whether the top border of the table is displayed. Useful with `top nav bar`. | `optional`|

<br/>

```typescript
/** Define the data to be used in the sub-row.
Each index represents the data for the sub-row corresponding to each parent row. **/
const subRowData: Object[] = [
  [
    {
      no: 1,
      name: "kim", // First item in the first sub-row
    },
    {
      no: 2,
      name: "park", // Second item in the first sub-row
    },
  ],
  [
    {
      no: 1,
      name: "lee", // First item in the second sub-row
    },
    {
      no: 2,
      name: "heo", // Second item in the second sub-row
    },
  ],
];

// Call the useSubRowContents hook to get the state and state management function to set up the sub-row.
const { subRowContents } = useSubRowContents(subRowData);

return (
  <TableProvider
    useParentRowUi={true} // Set to inherit the parent's row UI for the sub-row
    subRowContents={subRowContents} // Pass the data to use in the sub-row
    borderLeftNone={true} // Set whether to show the left border
    borderTopNone={true} // Set whether to show the top border
  >
    <TableHeader table={table} /> // Render the table header
    <TableBody table={table} /> // Render the table body
  </TableProvider>
);
```

<br/>

- **`SubRowComponent` and `clickEvent` parameters are as follows**
  <br/>

  1. `SubRowComponent`
     | Params | Type | Description | Required |
     |------------|--------------|--------------------------------------------------------------------------------------------------|-----------|
     | `contents` | `object[]` | The data passed from `TableProvider` through the `subRowContents` prop. | optional |
  2. `rowClickEvent` and `subRowClickEvent`
     | Params | Type | Description | Required |
     |------------|--------------|--------------------------------------------------------------------------------------------------|-----------|
     | `rowIndex` | `number` | Index of the clicked row | optional |
     | `e` | `MouseEvent` | Event object for the click event | optional |
  3. `cellClickEvent` and `subRowCellClickEvent`
     | Params | Type | Description | Required |
     |------------|--------------|--------------------------------------------------------------------------------------------------|-----------|
     | `rowIndex` | `number` | Index of the row to which the clicked cell belongs | optional |
     | `cellIndex`| `number` | Index of the clicked cell | optional |
     | `e` | `MouseEvent` | Event object for the click event | optional |

<br/>

```typescript
/* 1. Define the custom sub-row component */
const SubRowComponent = ({ contents }: { contents: Array<object> }) => {
  // Customize and return the UI of the sub-row.
  return; // Add custom UI logic here.
};

return (
  <TableProvider
    SubRowComponent={SubRowComponent} // Pass the custom sub-row component
    subRowContents={subRowContents} // Pass the data to use in the sub-row
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);

/* 2. Define click event handlers */

// Row click event handler
const handleClickRow = ({ rowIndex, e }: RowClickEventParam) => {
  // Write logic using the clicked row's index and event object
  /* Write event handler logic using rowIndex, e */
};

// Cell click event handler
const handleClickCell = ({ cellIndex, rowIndex, e }: CellClickEventParam) => {
  // Write logic using the clicked cell's index, row index, and event object
  /* Write event handler logic using cellIndex, rowIndex, e */
};

/*
  * Examples of using parameters in the event handler
    1. rowIndex, cellIndex: Use when writing logic for a specific row or column.
       Ex) For logic when clicking the second column 'name':
       if(cellIndex === 1) { * Write logic * }

    2. e: Use the event object to handle specific click events.
       Ex) Prevent event bubbling when a specific cell is clicked:
       e.stopPropagation(); // Prevent event bubbling

  ** Sub-row/cell click events are handled in the same way.
*/

return (
  <TableProvider
    useParentRowUi={true} // Set to inherit the parent's row UI for the sub-row
    subRowContents={subRowContents} // Pass the data to use in the sub-row
    rowClickEvent={handleClickRow} // Pass the row click event handler
    cellClickEvent={handleClickCell} // Pass the cell click event handler
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);
```

### 3.2 TableHeader

- This component renders the table column headers.
- You can control `layer`, `rowSpan`, and `colSpan` through the `header option`.
- The `props` to pass when calling the component are as follows.
  | Props | Type | Explanation | Required |
  |---------------|-----------------|-----------------------------------------------------------------------------|----------|
  | `table` | `Table<TData>` | The table data instance returned by the `useTable` hook | required |
  | `style` | `CSSProperties` | Inline style to set CSS properties | optional |
  | `headerOption`| `HeaderOptionType`| Detailed options for rendering the header | optional |

<br/>

- The type of `headerOption` is as follows.
  | Property | Type | Explanation |
  |---------------|----------|--------------------------------------------------------------------------|
  | `accessorKey` | `string` | Key to map between the header and header option |
  | `layer` | `number` | Determines at which row the header starts |
  | `rowSpan` | `number` | Determines the height the header will occupy based on the defined layer |
  | `colSpan` | `number` | Determines the width the header will occupy |

<br/>

```typescript
// Define header option type
const headerOption: HeaderOptionType[] = [
  { accessorKey: "no", layer: 1, colSpan: 1, rowSpan: 1 }, // Options for the 'no' column
  { accessorKey: "name", layer: 1, colSpan: 1, rowSpan: 1 }, // Options for the 'name' column
];

// Call the TableHeader component
<TableHeader
  table={table} // Table data instance returned from the useTable hook
  headerOption={headerOption} // Pass the rendering options for each column
  style={{
    fontSize: "14px", // Set CSS properties
    padding: "4px", // Set CSS properties
    border: "1px solid black", // Set CSS properties
    backgroundColor: "darkgray", // Set CSS properties
  }}
/>;
```

<br/>

### 3.3 TableBody

- This component renders the actual table data, consisting of `TableBodyRow` for each row and `TableBodyCell` for each cell.
- The `props` to pass when calling the component are as follows.
  | Props | Type | Explanation | Required |
  |--------------------|------------------------------|------------------------------------------------------------------------------------|----------|
  | `table` | `Table<TData>` | The table data instance returned by the `useTable` hook | required |
  | `interactiveStyles`| `{ hoverColor: string; clickedColor: string; }` | Styles for hover and click background colors on table rows | optional |
  | `subRowProps` | `object` | Settings related to `subRow` | optional |

<br/>

**Note:** To apply the `hoverColor` for rows and sub-rows, make sure to import the CSS file:

```typescript
/* This CSS import is required for the hover styles to be applied properly. */
import "rex-web-table/src/style/style.css";

<TableBody
  table={table} // Pass the table data instance returned by the useTable hook
  style={{
    // Set styles for the table body using CSS properties
    fontSize: "14px",
    border: "1px solid black",
    textAlign: "center",
  }}
  interactiveStyles={{
    hoverColor: "white", // Set background color when hovering over a row
    clickedColor: "black", // Set background color when a row is clicked
  }}
/>;
```

<br/>

- The structure of `subRowProps` is as follows.
  | Props | Type | Explanation | Required |
  |--------------|------------------|------------------------------------------------------------------------------------------------------------------|----------|
  | `expandState`| `Array<boolean>` | State related to the expansion of `subRow` | optional |
  | `style` | `CSSProperties` | Inline style to set CSS properties. <br/> **Works only when `useParentRowUi` is `true`.** | optional |
  | `hoverColor` | `string` | Set background color when hovering over a `subRow`. <br/> **Works only when `useParentRowUi` is `true`.** | optional |

<br/>

```typescript
/**
 * Use the useSubRowExpand hook to get the state and state management function related to the expansion state of sub-rows.
 * This hook manages whether each row of the table can be expanded.
 */
const { expandState, changeSubRowExpandState } = useSubRowExpand();

/**
 * Define a function to change the expansion state of the clicked row.
 * Users can create this manually and use the `changeSubRowExpandState` returned from the hook
 * to pass the `rowIndex` of the clicked row and change its state.
 */
const handleClickRow = ({ rowIndex }: { rowIndex: number }) => {
  // Use rowIndex to change the state of the clicked row
  changeSubRowExpandState(rowIndex);
};

<TableProvider
  useParentRowUi={true}
  subRowContents={subRowContents}
  rowClickEvent={handleClickRow} // Call the function defined above when a row is clicked
>
  <TableBody
    table={table}
    subRowProps={{
      expandState, // Pass the expansion state of the sub-rows
      style: {
        backgroundColor: "ivory", // Set CSS properties for sub-row styles
      },
      hoverColor: "red", // Set background color when hovering over a sub-row
    }}
  />
</TableProvider>;
```

<br/>

### 3.4 TableFooter

- This component handles pagination functionality, which can be used optionally if needed.
- The `props` to pass when calling the component are as follows.
  | Props | Type | Explanation | Required |
  |-------------------|------------------------------------------------|------------------------------------------------------------|----------|
  | `pagination` | `PaginationState` | State related to pagination | required |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | State management function for pagination | required |
  | `totalPageNum` | `number` | Total number of pages | required |
  | `pageSizeList` | `Array<number>` | Options list for the number of contents displayed per page | optional |
  | `styles` | `{ containerStyle: CSSProperties; pageSizeSelectStyle: PageSelectStyleProps; pageNumButtonStyle: PageButtonStyleProps; }` | CSS styles for the internal components of `TableFooter` | optional |

<br/>

- Each component of the `style` property is structured as follows.
  <br/>

  1. `containerStyle`
     | Props | Type | Explanation | Required |
     |-------------------|-----------------|-----------------------------------------------------|----------|
     | `containerStyle` | `CSSProperties` | Set the style for the container holding the component| optional |

  2. `pageSizeSelectStyle`
     | Props | Type | Explanation | Required |
     |------------------|------------------|-------------------------------------|----------|
     | `fontColor` | `string` | Set the text color of `select` | optional |
     | `backgroundColor`| `string` | Set the background color of `select`| optional |
     | `border` | `string` | Set the border of `select` | optional |

  3. `pageNumButtonStyle`
     | Props | Type | Explanation | Required |
     |-------------------------|---------|-------------------------------------------------------------------------------------|----------|
     | `fontColor` | `string`| Set the text color of `button` | optional |
     | `border` | `string`| Set the border of `button` | optional |
     | `backgroundColor` | `string`| Set the background color of the `page num button` | optional |
     | `arrowBackgroundColor` | `string`| Set the background color of the `prev/next button` | optional |
     | `selectedNumberButtonColor`| `string`| Set the background color of the selected `page num button` | optional |
     | `disabledArrowButtonColor`| `string`| Set the background color when `prev/next button` is disabled (when at first/last page)| optional |
     | `disabledArrowColor` | `string`| Set the text color when `prev/next button` is disabled | optional |

<br/>

```typescript
/**
 * Use the useTable hook to get the table and pagination-related data.
 * To enable pagination, set `isPagination` to true.
 */
const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
  data,
  columns,
  isPagination: true, // Enable pagination
});

/**
 * Call the TableFooter component to implement pagination.
 * Pass the necessary pagination state and related settings as props.
 */
<TableFooter
  pagination={pagination} // Pass the current pagination state
  setPagination={setPagination} // Pass the function to manage pagination state
  totalPageNum={totalPageNum} // Pass the total number of pages
  styles={{
    containerStyle: {
      // Set the style for the container in TableFooter
      padding: "2px 3px",
      border: "1px solid darkgray",
      borderLeft: "none",
    },
    pageSizeSelectStyle: {
      // Set the style for the page size select dropdown
      border: "none",
    },
    pageNumButtonStyle: {
      // Set the style for the page number buttons
      border: "none",
      backgroundColor: "transparent",
      disabledArrowColor: "darkgray",
    },
  }}
/>;
```

### 3.5 useTable

- A custom hook that returns the data to be passed as `props` to the `TableHeader`, `TableBody`, and `TableFooter` components.
- The `props` to be passed when calling the hook are as follows:

| Props          | Type                  | Explain                                   | Required |
| -------------- | --------------------- | ----------------------------------------- | -------- |
| `data`         | `Array<T>`            | Data used to compose the table `body`.    | required |
| `columns`      | `Array<ColumnDef<T>>` | Data used for table `column` settings.    | required |
| `isPagination` | `boolean`             | Determines whether pagination is enabled. | optional |

<br/>

- The values returned by the hook are as follows:

| Returned Value  | Type                                        | Explain                                                                                     |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `table`         | `Table<TData>`                              | Instance object used for table settings. Used as `props` for `TableHeader` and `TableBody`. |
| `pagination`    | `PaginationState`                           | Pagination state. Used as `props` for `TableFooter`.                                        |
| `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | Function to manage pagination state. Used as `props` for `TableFooter`.                     |
| `totalPageNum`  | `number`                                    | Total number of pages. Used as `props` for `TableFooter`.                                   |

<br/>

```typescript
/**
 * Sample data to be displayed in the table's body.
 */
const data = [
  { id: 1, name: "kim", age: 28 },
  { id: 2, name: "lee", age: 22 },
];

/**
 * Column definitions for the table.
 * You can customize each cell using the `cell` property.
 */
const columns: ColumnDef<{ id: number; name: string; age: number }>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ getValue }) => {
      const age = getValue();
      return <span>{age} years old</span>;
    },
  },
];

/**
 * Calling the useTable hook to get the table and pagination states.
 */
const { table, totalPageNum, pagination, setPagination } = useTable<{
  id: number;
  name: string;
  age: number;
}>({
  data,
  columns,
  isPagination: true,
});

/**
 * Rendering the table components.
 */
return (
  <TableProvider>
    <TableHeader table={table} />
    <TableBody table={table} />
    <TableFooter
      pagination={pagination}
      setPagination={setPagination}
      totalPageNum={totalPageNum}
    />
  </TableProvider>
);
```

<br/>

### 3.6 useSubRowContents

- A custom hook that returns the state and state management function to be passed as `subRowContents` to the `TableProvider`.
- The values returned by the hook are as follows:

| Returned Value      | Type                                        | Explain                                            |
| ------------------- | ------------------------------------------- | -------------------------------------------------- |
| `subRowContents`    | `Array<object[]>`                           | State used for `TableProvider`'s `subRowContents`. |
| `setSubRowContents` | `Dispatch<SetStateAction<Array<object[]>>>` | Function to manage `subRowContents` state.         |

<br/>

```typescript
/**
 * Sample data for sub-rows, where each index corresponds to sub-row data for a parent row.
 */
const subRowData: object[][] = [
  [
    { no: 1, name: "lee" },
    { no: 2, name: "kim" },
  ],
  [
    { no: 1, name: "park" },
    { no: 2, name: "choi" },
  ],
];

/**
 * Calling the useSubRowContents hook to manage the sub-row contents state.
 */
const { subRowContents, setSubRowContents } = useSubRowContents(subRowData);

/**
 * Rendering the table with sub-row contents.
 */
return (
  <TableProvider useParentRowUi={true} subRowContents={subRowContents}>
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);
```

<br/>

### 3.7 useSubRowExpand

- A custom hook that returns the state and state management function for `expandState` in the `TableBody`.
- The values returned by the hook are as follows:

| Returned Value            | Type                                  | Explain                                                  |
| ------------------------- | ------------------------------------- | -------------------------------------------------------- |
| `expandState`             | `Array<boolean>`                      | The current state of `expandState` in `TableBody`.       |
| `setExpandState`          | `Dispatch<SetStateAction<boolean[]>>` | Function to manage the `expandState`.                    |
| `changeSubRowExpandState` | `function`                            | Function to toggle the `expandState` of the clicked row. |

<br/>

```typescript
/**
 * Manages the expansion state of sub-rows.
 * Returns the current expansion state and a function to toggle the state.
 */
const { expandState, changeSubRowExpandState } = useSubRowExpand();

/**
 * Handler function that is called when a specific table row is clicked.
 * Receives the clicked row's index and toggles the expansion state.
 */
const handleRowClick = ({ rowIndex }: { rowIndex: number }) => {
  changeSubRowExpandState(rowIndex);
};

/**
 * Uses TableProvider to render the table, managing the sub-row expansion state.
 * Passes the handler to `rowClickEvent` to change the expansion state when clicked.
 */
return (
  <TableProvider
    useParentRowUi={true} // Inherits parent row UI in the sub-row
    subRowContents={subRowContents} // Data to use in the sub-rows
    rowClickEvent={handleRowClick} // Click handler to change expansion state
  >
    <TableBody
      table={table}
      subRowProps={{
        expandState, // Expansion state for sub-rows
      }}
    />
  </TableProvider>
);
```

<br/>

### 3.8 getClickedRowContent, getClickedCellContent

- Utility functions that return the content of the clicked row or cell.
- Example usage is as follows:

```typescript
/**
 * Example of retrieving the clicked row's content in a click event handler.
 * You can perform additional actions using the row data if needed.
 */
const handleClickRow = () => {
  const rowContent = getClickedRowContent(); // Retrieve the clicked row's content
  console.log("Clicked row data:", rowContent);
};

/**
 * Example of retrieving the clicked cell's content in a click event handler.
 * You can use the cell data as needed.
 */
const handleClickCell = () => {
  const cellContent = getClickedCellContent(); // Retrieve the clicked cell's content
  console.log("Clicked cell data:", cellContent);
};

return (
  <TableProvider
    rowClickEvent={handleClickRow} // Pass the row click event handler
    cellClickEvent={handleClickCell} // Pass the cell click event handler
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);
```

<br/>

## 4. Issue

- The `sorting` functionality is currently unimplemented and will need further development in the future.
