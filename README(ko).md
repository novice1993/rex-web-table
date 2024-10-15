## 1. Introduction

- `tanstack/react-table`을 활용해 구현된 테이블 라이브러리입니다.
- `React` 기반의 프로젝트에서 활용이 가능합니다.
- 테이블 column/data 설정, pagination, 테이블 데이터 커스텀 기능을 제공합니다.
- Headless UI로 제작되어 스타일링 커스텀이 가능합니다.

## 2. Quick Start

### Installation

- using npm : `npm install rex-web-table`
- using yarn : `yarn add rex-web-table`

### CSS Import

- 행과 서브 행의 hover 스타일을 적용하려면 제공된 CSS 파일을 import하세요:

```typescript
/** 라이브러리를 사용할 때 행과 서브 행의 `hoverColor`가 올바르게 적용되도록 합니다. **/
import "rex-web-table/src/style/style.css";
```

### Example

```typescript
const Table = () => {
  // 1. 테이블의 각 행에 대한 데이터 타입 정의
  interface Example {
    no: number;
    name: string;
  }

  // 2. 테이블의 열 구조 정의
  const columns: ColumnDef<Example>[] = [
    {
      accessorKey: "no", // data 와 매핑되는 key
      header: "No.", // 열 제목
      size: 10, // 열 크기 (옵션)
    },
    {
      accessorKey: "name",
      header: "Name", // 열 제목
      size: 90,
    },
  ];

  // 3. 테이블에 표시할 데이터 정의
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

  // 4. useTable 훅 호출하여 테이블, 페이지네이션 데이터 생성
  const { table, pagination, setPagination, totalPageNum } = useTable({
    data, // 테이블 데이터
    columns, // 테이블 열
    isPagination: true, // 페이지네이션 적용
  });

  // 5. 제공된 컴포넌트 (TableProvider, TableHeader, TableBody, TableFooter)를 사용하여 테이블 렌더링
  return (
    <div>
      <TableProvider>
        <TableHeader table={table} /> {/* 테이블 헤더 렌더링 */}
        <TableBody table={table} /> {/* 테이블 본문 렌더링 */}
      </TableProvider>

      {/* 페이지네이션 컨트롤을 포함한 푸터 렌더링 */}
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

- `TableHeader`, `TableBody` 를 감싸는 `Provider`로, 각 컴포넌트에 `props`를 전달하는 역할을 수행합니다.
  | Props | Type | Explain | Required |
  |---------------------|-----------------------|------------------------------------------------------------------------------------------------------|-----------|
  | `useParentRowUi` | `boolean` | `SubRow`를 활용할 때 부모 Row의 UI를 그대로 상속받아 `SubRow`를 생성할지 여부를 결정합니다. `true`일 경우 부모의 UI를 상속받습니다. | `optional`|
  | `SubRowComponent` | `ReactNode` | `SubRow` 커스텀이 필요할 경우, 직접 컴포넌트를 전달하여 활용합니다. | `optional`|
  | `subRowContents` | `Array<object[]>` | `SubRow` 컴포넌트에서 활용되는 데이터입니다. | `optional`|
  | `rowClickEvent` | `function` | Table의 행을 클릭했을 때 실행되는 함수입니다. | `optional`|
  | `cellClickEvent` | `function` | Table의 각 셀을 클릭했을 때 실행되는 함수입니다. | `optional`|
  | `subRowClickEvent` | `function` | Sub Row의 행을 클릭했을 때 실행되는 함수입니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | `optional`|
  | `subRowCellClickEvent`| `function` | Sub Row의 각 셀을 클릭했을 때 실행되는 함수입니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | `optional`|
  | `borderLeftNone` | `boolean` | `Table border` 중 `left` 표시 여부 <br/> **`left nav bar`와 함께 활용 시 `border` 겹치는 상황에서 활용** | `optional`|
  | `borderTopNone` | `boolean` | `Table border` 중 `top` 표시 여부 <br/>**`Top nav bar`와 함께 활용 시 `border` 겹치는 상황에서 활용** | `optional`|

<br/>

```typescript
/** 서브 행에서 사용할 데이터를 정의합니다.
각 인덱스는 각 부모 행에 대응하는 서브 행의 데이터를 나타냅니다. **/
const subRowData: Object[] = [
  [
    {
      no: 1,
      name: "kim", // 첫 번째 서브 행의 첫 번째 항목
    },
    {
      no: 2,
      name: "park", // 첫 번째 서브 행의 두 번째 항목
    },
  ],
  [
    {
      no: 1,
      name: "lee", // 두 번째 서브 행의 첫 번째 항목
    },
    {
      no: 2,
      name: "heo", // 두 번째 서브 행의 두 번째 항목
    },
  ],
];

// useSubRowContents 훅을 호출하여 서브 행으로 설정할 상태와 상태 관리 함수를 가져옵니다.
const { subRowContents } = useSubRowContents(subRowData);

return (
  <TableProvider
    useParentRowUi={true} // 부모 행의 UI를 서브 행에 상속받도록 설정
    subRowContents={subRowContents} // 서브 행에서 사용할 데이터를 전달
    borderLeftNone={true} // 왼쪽 테두리 표시 여부 설정
    borderTopNone={true} // 상단 테두리 표시 여부 설정
  >
    <TableHeader table={table} /> // 테이블 헤더 컴포넌트 렌더링
    <TableBody table={table} /> // 테이블 바디 컴포넌트 렌더링
  </TableProvider>
);
```

<br/>

- **`SubRowComponent` `clickEvent` 의 매개변수는 아래와 같습니다**
  <br/>

  1. `SubRowComponent`
     | Params | Type | Explain | Required |
     | ---------- | ------------ | ---------------- | -------- |
     | `contents` | `object[]` | `TableProvider`에서 `subRowContents` `props` 로 전달한 데이터 | optional |
  2. `rowClickEvent`와 `subRowClickEvent`
     | Params | Type | Explain | Required |
     | ---------- | ------------ | ---------------- | -------- |
     | `rowIndex` | `number` | 클릭한 행의 순서 | optional |
     | `e` | `MouseEvent` | 클릭 이벤트 객체 | optional |
  3. `cellClickEvent`와 `subRowCellClickEvent`
     | Params | Type | Explain | Required |
     | ----------- | ------------ | -------------------------- | -------- |
     | `rowIndex` | `number` | 클릭한 셀이 속한 행의 순서 | optional |
     | `cellIndex` | `number` | 클릭한 셀의 순서 | optional |
     | `e` | `MouseEvent` | 클릭 이벤트 객체 | optional |

<br/>

```typescript
/* 1. 커스터 서브 행 컴포넌트 정의 */
const SubRowComponent = ({ contents }: { contents: Array<object> }) => {
  // 서브 행의 UI를 커스터마이즈하여 반환합니다.
  return; // UI 커스텀 로직을 여기에 작성합니다.
};

return (
  <TableProvider
    SubRowComponent={SubRowComponent} // 커스텀 서브 행 컴포넌트를 전달합니다.
    subRowContents={subRowContents} // 서브 행에 사용할 데이터를 전달합니다.
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);

/* 2. 클릭 이벤트 핸들러 정의 */

// 행 클릭 이벤트 핸들러
const handleClickRow = ({ rowIndex, e }: RowClickEventParam) => {
  // 클릭한 행의 인덱스와 이벤트 객체를 활용하여 로직을 작성합니다.
  /* 내부에서 rowIndex, e 활용 및 기타 로직 작성하여 이벤트 핸들러 생성 */
};

// 셀 클릭 이벤트 핸들러
const handleClickCell = ({ cellIndex, rowIndex, e }: CellClickEventParam) => {
  // 클릭한 셀의 인덱스, 행 인덱스 및 이벤트 객체를 활용하여 로직을 작성합니다.
  /* 내부에서 cellIndex, rowIndex, e 활용 및 기타 로직 작성하여 이벤트 핸들러 생성 */
};

/*
  * 이벤트 핸들러에서 매개변수 활용 예시
    1. rowIndex, cellIndex: 특정 행 또는 열에서 작동하는 로직을 작성할 때 사용합니다.
       예) 두 번째 열인 'name' column의 셀을 클릭했을 때 작동하는 이벤트가 필요할 경우:
       if(cellIndex === 1) { * 로직 작성 * }

    2. e: 특정 클릭 이벤트에 대한 이벤트 객체를 활용해야 할 때 사용합니다.
       예) 특정 셀을 클릭했을 때, row 이벤트 핸들러로 버블링이 발생하지 않도록 하려면:
       e.stopPropagation(); // 이벤트 버블링을 방지합니다.

  ** 서브 행/셀 클릭 이벤트도 동일한 방식으로 활용됩니다.

*/

return (
  <TableProvider
    useParentRowUi={true} // 부모 행의 UI를 서브 행에 상속받도록 설정합니다.
    subRowContents={subRowContents} // 서브 행에 사용할 데이터를 전달합니다.
    rowClickEvent={handleClickRow} // 행 클릭 이벤트 핸들러를 전달합니다.
    cellClickEvent={handleClickCell} // 셀 클릭 이벤트 핸들러를 전달합니다.
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);
```

<br/>

### 3.2 TableHeader

- 테이블 열 `column` 제목을 렌더링하는 컴포넌트입니다.
- `header option` 을 통해 `layer`, `rowSpan`, `colSpan` 을 제어할 수 있습니다.
- 컴포넌트 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | -------------- | ------------------ | ----------------------------------------------- | -------- |
  | `table` | `Table<TData>` | `useTable` 훅이 반환하는 테이블 데이터 인스턴스 | required |
  | `style` | `CSSProperties` | `inline Style`을 통해 CSS 속성을 설정 | optional |
  | `headerOption` | `HeaderOptionType` | Header 렌더링 관련 세부 속성 설정 | optional |

<br/>

- `headerOption`의 `type`은 아래와 같습니다.
  | Property | Type | Explain |
  | ------------- | -------- | ---------------------------------------------------------- |
  | `accessorKey` | `string` | header와 header option을 매핑하는 key 값 |
  | `layer` | `number` | header가 몇 번째 줄에서 시작할지 결정하는 값 |
  | `rowSpan` | `number` | 설정한 layer를 기준으로 header가 차지할 높이를 결정하는 값 |
  | `colSpan` | `number` | header가 차지할 너비를 결정하는 값 |

<br/>

```typescript
// Header 옵션 타입 정의
const headerOption: HeaderOptionType[] = [
  { accessorKey: "no", layer: 1, colSpan: 1, rowSpan: 1 }, // 'no' 열에 대한 옵션 설정
  { accessorKey: "name", layer: 1, colSpan: 1, rowSpan: 1 }, // 'name' 열에 대한 옵션 설정
];

// TableHeader 컴포넌트 호출
<TableHeader
  table={table} // useTable 훅에서 반환된 테이블 데이터 인스턴스
  headerOption={headerOption} // 각 열의 렌더링 관련 옵션을 전달
  style={{
    fontSize: "14px", // CSS 속성 설정
    padding: "4px", // CSS 속성 설정
    border: "1px solid black", // CSS 속성 설정
    backgroundColor: "darkgray", // CSS 속성 설정
  }}
/>;
```

<br/>

### 3.3 TableBody

- 실제 테이블 데이터를 렌더링하는 컴포넌트로, 각 행 `TableBodyRow`와 이를 구성하는 셀 `TableBodyCell`로 구성되어 있습니다.
- 컴포넌트 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | ------------------- | ----------------------------------------------- | ----------------------------------------------- | -------- |
  | `table` | `Table<TData>` | `useTable` 훅이 반환하는 테이블 데이터 인스턴스 | required |
  | `interactiveStyles` | `{ hoverColor: string; clickedColor: string; }` | 테이블 행의 마우스 hover 시와 클릭 시 배경색 지정 | optional |
  | `subRowProps` | `object` | `subRow` 관련 설정 | optional |

<br/>

**Note:** 행과 서브 행의 `hoverColor` 을 적용하려면 반드시 CSS 파일을 import해야 합니다:

```typescript
/* hover 스타일을 올바르게 적용하려면 이 CSS import가 필요합니다. */
import "rex-web-table/src/style/style.css";

<TableBody
  table={table} // useTable 훅에서 반환된 테이블 데이터 인스턴스 전달
  style={{
    // 테이블 바디의 CSS 속성을 설정하여 스타일을 전달
    fontSize: "14px",
    border: "1px solid black",
    textAlign: "center",
  }}
  interactiveStyles={{
    hoverColor: "white", // 행 hover 시 배경색 설정
    clickedColor: "black", // 행 클릭 시 배경색 설정
  }}
/>;
```

<br/>

- **`subRowProps` 의 구성은 아래와 같습니다.**
  | Props | Type | Explain | Required |
  | ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | `expandState` | `Array<boolean>` | `subRow` 확장과 관련된 상태입니다. | optional |
  | `style` | `CSSProperties` | inline Style 을 통해 CSS 속성을 설정할 수 있습니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.**| optional |
  | `hoverColor` | `string` | subRow에 마우스를 hover 했을 때 발생하는 배경색을 설정할 수 있습니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | optional |

<br/>

```typescript
/**
 * useSubRowExpand 훅을 사용하여 서브 행의 확장 상태와 관련된 상태와 상태 관리 함수를 가져옵니다.
 * 이 훅을 통해 테이블의 각 행이 확장될 수 있는지를 관리할 수 있습니다.
 */
const { expandState, changeSubRowExpandState } = useSubRowExpand();

/**
 * 클릭한 행의 확장 상태를 변경하는 함수를 정의합니다.
 * 유저가 직접 만들어 활용할 수 있으며, 훅에서 반환한 `changeSubRowExpandState`를 사용하여
 * 클릭한 행의 `rowIndex`를 전달하여 서브 행의 상태를 변경합니다.
 */
const handleClickRow = ({ rowIndex }: { rowIndex: number }) => {
  // rowIndex를 사용해 클릭한 행의 상태를 변경
  changeSubRowExpandState(rowIndex);
};

<TableProvider
  useParentRowUi={true}
  subRowContents={subRowContents}
  rowClickEvent={handleClickRow} // 행 클릭 시 위에서 정의한 함수를 호출
>
  <TableBody
    table={table}
    subRowProps={{
      expandState, // 서브 행의 확장 상태를 전달
      style: {
        backgroundColor: "ivory", // 테이블의 서브 행에 적용할 CSS 속성을 설정
      },
      hoverColor: "red", // 서브 행에 마우스 hover 시 배경색을 설정
    }}
  />
</TableProvider>;
```

<br/>

### 3.4 TableFooter

- 페이지네이션 기능을 담당하는 컴포넌트로, 해당 기능이 필요할 경우 선택적으로 활용 가능합니다.
- 컴포넌트 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | --------------- | ------------------------------------------- | ------------------------------------------- | -------- |
  | `pagination` | `PaginationState` | 페이지네이션 관련 상태 | required |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | 페이지네이션 상태관리 함수 | required |
  | `totalPageNum` | `number` | 전체 페이지 개수 관련 데이터 | required |
  | `pageSizeList` | `Array<number>` | 한 페이지 당 표시할 컨텐츠 개수 옵션 리스트 | optional |
  | `styles` | `{ containerStyle: CSSproperties; pageSizeSelectStyle: PageSelectStlyeProps; pageNumButtonStyle: PageButtonStyleProps; }` | `TableFooter` 내부 구성 요소에 대한 `css` 스타일 설정 | optional

<br/>

- `style` 의 각 구성요소는 아래와 같습니다.
  <br/>

  1. `contianerStyle`
     | Props | Type | Explain | Required |
     | --------------- | ------------------------------------------- | ------------------------------------------- | -------- |
     | `containerStyle` | `CSSProperties` | 컴포넌트를 담는 `container` 의 스타일 설정 | optional |

  2. `pageSizeSelectStyle`
     | Props | Type | Explain | Required |
     | --------------- | ------------------------------------------- | ------------------------------------------- | -------- |
     | `fontColor` | `string` | `select` 글자색 설정 | optional |
     | `backgroundColor` | `string` | `select` 배경색 설정 | optional |
     | `border` | `string` | `select` 윤곽선 설정 | optional |
  3. `pageNumButtonStyle`
     | Props | Type | Explain | Required |
     | --------------- | ------------------------------------------- | ------------------------------------------- | -------- |
     | `fontColor` | `string` | `button` 글자색 설정 | optional |
     | `border` | `string` | `button` 윤곽선 설정 | optional |
     | `backgroundColor` | `string` | `page num button` 배경색 설정 | optional |
     | `arrowBackgroundColor` | `string` | `prev/next button` 배경색 설정 | optional |
     | `selectedNumberButtonColor` | `string` | 현재 선택된 `page num button` 배경색 설정 | optional |
     | `disabledArrowButtonColor` | `string` | `prev/next button` 비활성화 시 (맨 앞/뒤 페이지일 경우) 배경색 설정 | optional |
     | `disabledArrowColor` | `string` | `prev/next button` 비활성화 시 글자색 설정 | optional |

<br/>

```typescript
/**
 * useTable 훅을 사용하여 테이블 관련 상태와 페이지네이션 관련 데이터를 가져옵니다.
 * 페이지네이션 기능을 활성화하려면 `isPagination`을 true로 설정해야 합니다.
 */
const { table, totalPageNum, pagination, setPagination } = useTable<Example>({
  data,
  columns,
  isPagination: true, // 페이지네이션 기능 활성화
});

/**
 * TableFooter 컴포넌트를 호출하여 페이지네이션 기능을 구현합니다.
 * 필요한 페이지네이션 상태와 관련된 설정을 props로 전달합니다.
 */
<TableFooter
  pagination={pagination} // 현재 페이지네이션 상태를 전달
  setPagination={setPagination} // 페이지네이션 상태를 관리하는 함수 전달
  totalPageNum={totalPageNum} // 전체 페이지 수를 전달
  styles={{
    containerStyle: {
      // TableFooter의 컨테이너 스타일 설정
      padding: "2px 3px",
      border: "1px solid darkgray",
      borderLeft: "none",
    },
    pageSizeSelectStyle: {
      // 페이지 사이즈 선택의 스타일 설정
      border: "none",
    },
    pageNumButtonStyle: {
      // 페이지 번호 버튼의 스타일 설정
      border: "none",
      backgroundColor: "transparent",
      disabledArrowColor: "darkgray",
    },
  }}
/>;
```

<br/>

### 3.5 useTable

- `TableHeader`, `TableBody`, `TableFooter` 컴포넌트의 `props`로 전달할 데이터를 반환하는 커스텀 훅입니다.
- 훅 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | -------------- | --------------------- | ----------------------------------------------- | -------- |
  | `data` | `Array<T>` | 테이블 `body` 를 구성하는 데이터입니다. | required |
  | `columns` | `Array<ColumnDef<T>>` | 테이블 `column` 설정에 활용되는 데이터입니다. | required |
  | `isPagination` | `boolean` | 페이지네이션 설정 여부를 결정하는 데이터입니다. | optional |

<br/>

- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Type | Explain |
  | --------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
  | `table` | `Table<TData>` | 테이블 설정에 활용되는 인스턴스 객체. `TableHeader`, `TableBody`의 `props`로 활용됩니다. |
  | `pagination` | `PaginationState` | 페이지네이션 관련 상태. `TableFooter`의 `props`로 활용됩니다. |
  | `setPagination` | `Dispatch<SetStateAction<PaginationState>>` | 페이지네이션 관련 상태관리 함수. `TableFooter`의 `props`로 활용됩니다. |
  | `totalPageNum` | `number` | 전체 페이지 개수를 의미합니다. `TableFooter`의 `props`로 활용됩니다. |

<br/>

```typescript
/**
 * 테이블에 표시할 데이터와 컬럼 정의
 * 이 데이터는 테이블의 본문을 구성합니다.
 */
const data = [
  { id: 1, name: "kim", age: 28 },
  { id: 2, name: "lee", age: 22 },
];

/**
 * 테이블의 각 컬럼을 정의합니다.
 * ColumnDef 타입을 사용하여 각 컬럼의 키와 속성을 설정합니다.
 */
const columns: ColumnDef<{ id: number; name: string; age: number }>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "이름" },

  // **셀 커스터마이징**
  // 만약 셀에 커스텀 컴포넌트를 사용하고 싶다면,
  // cell 프로퍼티에 함수를 전달하여 원하는 값을 반환할 수 있습니다.
  // 이때, .getValue() 메서드를 사용해 현재 행의 데이터를 쉽게 가져올 수 있습니다.
  {
    accessorKey: "age",
    header: "나이",
    cell: ({ getValue }) => {
      const age = getValue(); // 현재 행의 나이 값을 가져옵니다.
      return <span>{age}세</span>; // 나이 값을 커스텀 형식으로 반환합니다.
    },
  },
];

/**
 * useTable 훅을 호출하여 테이블과 페이지네이션 관련 상태를 가져옵니다.
 * 데이터와 컬럼을 props로 전달합니다.
 */
const { table, totalPageNum, pagination, setPagination } = useTable<{
  id: number;
  name: string;
  age: number;
}>({
  data, // 테이블의 본문 데이터
  columns, // 테이블의 컬럼 설정
  isPagination: true, // 페이지네이션 기능 활성화
});

/**
 * 테이블을 구성하는 컴포넌트를 호출합니다.
 * 각 컴포넌트는 useTable 훅에서 반환된 값을 props로 전달받습니다.
 */
return (
  <TableProvider>
    <TableHeader table={table} /> {/* 테이블의 헤더를 렌더링 */}
    <TableBody table={table} /> {/* 테이블의 본문을 렌더링 */}
    <TableFooter
      pagination={pagination} // 현재 페이지네이션 상태 전달
      setPagination={setPagination} // 페이지네이션 상태를 관리하는 함수 전달
      totalPageNum={totalPageNum} // 전체 페이지 수 전달
    />
  </TableProvider>
);
```

<br/>

### 3.6 useSubRowContents

- `TableProvider`의 `subRowContents`에 전달할 상태와 상태 관리 함수를 반환하는 커스텀 훅입니다.
- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Type | Explain |
  | ------------------- | ------------------------------------------- | -------------------------------------------------- |
  | `subRowContents` | `Array<object[]>` | `TableProvider`의 `subRowContents`로 활용되는 상태 |
  | `setSubRowContents` | `Dispatch<SetStateAction<Array<object[]>>>` | `subRowContents` 상태관리 함수 |

<br/>

```typescript
/**
 * 서브 행에서 사용할 데이터를 정의합니다.
 * 각 인덱스는 각 부모 행에 대응하는 서브 행의 데이터를 나타냅니다.
 */
const subRowData: object[][] = [
  [
    { no: 1, name: "lee" }, // 첫 번째 서브 행의 첫 번째 항목
    { no: 2, name: "kim" }, // 첫 번째 서브 행의 두 번째 항목
  ],
  [
    { no: 1, name: "park" }, // 두 번째 서브 행의 첫 번째 항목
    { no: 2, name: "choi" }, // 두 번째 서브 행의 두 번째 항목
  ],
];

/**
 * useSubRowContents 훅을 호출하여 초기값으로 subRowData를 전달하고
 * 서브 행에서 사용할 상태와 상태 관리 함수를 가져옵니다.
 * 초기값은 선택적으로 전달 가능하며, 전달하지 않을 경우 빈 배열이 초기 값으로 설정됩니다.
 */
const { subRowContents, setSubRowContents } = useSubRowContents(subRowData);

/**
 * TableProvider를 사용하여 테이블을 구성합니다.
 * useParentRowUi가 true일 경우, 부모 행의 UI를 서브 행에서 상속받습니다.
 * subRowContents를 서브 행 데이터로 전달하여 활용합니다.
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

- `TableBody`의 `expandState`에 전달할 상태와 상태 관리 함수를 반환하는 커스텀 훅입니다.
- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Type | Explain |
  | ------------------------- | ------------------------------------- | ----------------------------------------- |
  | `expandState` | `Array<boolean>` | `TableBody`의 `expandState` 상태 |
  | `setExpandState` | `Dispatch<SetStateAction<boolean[]>>` | `expandState` 상태관리 함수 |
  | `changeSubRowExpandState` | `function` | 클릭한 행의 `expandState`를 변경하는 함수 |

<br/>

```typescript
/**
 * 서브 행의 확장 상태를 관리합니다.
 * 클릭한 행의 확장 상태를 변경하는 함수와 현재의 확장 상태를 반환합니다.
 */
const { expandState, changeSubRowExpandState } = useSubRowExpand();

/**
 * 테이블의 특정 행이 클릭되었을 때 호출되는 핸들러 함수입니다.
 * 클릭된 행의 인덱스를 받아 해당 행의 확장 상태를 변경합니다.
 * 이 함수는 사용자가 직접 정의하여 활용할 수 있습니다.
 */
const handleRowClick = ({ rowIndex }: { rowIndex: number }) => {
  changeSubRowExpandState(rowIndex);
};

/**
 * TableProvider를 사용하여 테이블을 구성합니다.
 * subRowContents와 함께 서브 행의 확장 상태를 관리합니다.
 * rowClickEvent에 핸들러를 전달하여 클릭 시 확장 상태를 변경하도록 설정합니다.
 */
return (
  <TableProvider
    useParentRowUi={true} // 부모 행의 UI를 서브 행에서 상속받도록 설정
    subRowContents={subRowContents} // 서브 행에서 사용할 데이터를 전달
    rowClickEvent={handleRowClick}
  >
    <TableBody
      table={table}
      subRowProps={{
        expandState, // 서브 행의 확장 상태
      }}
    />
  </TableProvider>
);
```

<br/>

### 3.8 getClickedRowContent, getClickedCellContent

- 사용자가 클릭한 행 및 셀의 콘텐츠를 가져오는 유틸리티 함수입니다.
- 사용 예시는 아래와 같습니다. (클릭 이벤트에 전달하여 사용하는 예시)

```typescript
/**
 * 클릭 이벤트 핸들러에서 클릭된 행의 콘텐츠를 가져오는 예시입니다.
 * 필요한 경우, 클릭된 행의 데이터를 활용하여 추가 작업을 수행할 수 있습니다.
 */
const handleClickRow = () => {
  const rowContent = getClickedRowContent(); // 클릭된 행의 콘텐츠 가져오기
  console.log("클릭된 행의 데이터:", rowContent);
};

/**
 * 클릭 이벤트 핸들러에서 클릭된 셀의 콘텐츠를 가져오는 예시입니다.
 * 필요에 따라 클릭된 셀의 데이터를 활용할 수 있습니다.
 */
const handleClickCell = () => {
  const cellContent = getClickedCellContent(); // 클릭된 셀의 콘텐츠 가져오기
  console.log("클릭된 셀의 데이터:", cellContent);
};

return (
  <TableProvider
    rowClickEvent={handleClickRow} // 행 클릭 이벤트 핸들러를 전달합니다.
    cellClickEvent={handleClickCell} // 셀 클릭 이벤트 핸들러를 전달합니다.
  >
    <TableHeader table={table} />
    <TableBody table={table} />
  </TableProvider>
);
```

<br/>

## 4. Issue

- 현재 `sorting` 기능이 미구현 된 상태로 추후 기능 보완이 필요한 상황입니다.
