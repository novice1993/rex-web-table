## 1. Introduction

- `tanstack/react-table`을 활용해 구현된 테이블 라이브러리입니다.
- `React` 기반의 프로젝트에서 활용이 가능합니다.
- 테이블 column/data 설정, sorting, pagination, 테이블 데이터 커스텀 기능을 제공합니다.
- Headless UI로 제작되어 자유롭게 스타일링 커스텀이 가능합니다.

## 2. Quick Start

### Installation

- using npm : `npm install rex-table`
- using yarn : `yarn add rex-table`

### Example

```typescript
import { useTable } from "rex-table";

const MyTable = () => {
  const table = useTable({ data, columns });

  return (
    <TableProvider table={table}>
      <TableHeader />
      <TableBody />
      <TableFooter />
    </TableProvider>
  );
};
```

## 3. API Reference

### 3.1 TableProvider

- `TableHeader`, `TableBody`, `TableFooter`를 감싸는 `Provider`로, 각 컴포넌트에 `props`를 전달하는 역할을 수행합니다.
  | Props | Type | Explain | Required |
  |---------------------|-----------------------|------------------------------------------------------------------------------------------------------|-----------|
  | `useParentRowUi` | `boolean` | `SubRow`를 활용할 때 부모 Row의 UI를 그대로 상속받아 `SubRow`를 생성할지 여부를 결정합니다. `true`일 경우 부모의 UI를 상속받습니다. | `optional`|
  | `SubRowComponent` | `ReactNode` | `SubRow` 커스텀이 필요할 경우, 직접 컴포넌트를 전달하여 활용합니다. | `optional`|
  | `subRowContents` | `Array<object[]>` | `SubRow` 컴포넌트에서 활용되는 데이터입니다. | `optional`|
  | `rowClickEvent` | `function` | Table의 행을 클릭했을 때 실행되는 함수입니다. | `optional`|
  | `cellClickEvent` | `function` | Table의 각 셀을 클릭했을 때 실행되는 함수입니다. | `optional`|
  | `subRowClickEvent` | `function` | Sub Row의 행을 클릭했을 때 실행되는 함수입니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | `optional`|
  | `subRowCellClickEvent`| `function` | Sub Row의 각 셀을 클릭했을 때 실행되는 함수입니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | `optional`|

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

### 3.3 TableBody

- 실제 테이블 데이터를 렌더링하는 컴포넌트로, 각 행 `TableBodyRow`와 이를 구성하는 셀 `TableBodyCell`로 구성되어 있습니다.
- 컴포넌트 호출 시 전달해야 하는 `props`는 아래와 같습니다.
  | Props | Type | Explain | Required |
  | ------------------- | ----------------------------------------------- | ----------------------------------------------- | -------- |
  | `table` | `Table<TData>` | `useTable` 훅이 반환하는 테이블 데이터 인스턴스 | required |
  | `interactiveStyles` | `{ hoverColor: string; clickedColor: string; }` | 테이블 행의 마우스 hover 시와 클릭 시 배경색 지정 | optional |
  | `subRowProps` | `object` | `subRow` 관련 설정 | optional |

<br/>

- **`subRowProps` 의 구성은 아래와 같습니다.**
  | Props | Type | Explain | Required |
  | ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
  | expandState | Array<boolean> | subRow 확장과 관련된 상태입니다. | optional |
  | style | CSSProperties | inline Style 을 통해 CSS 속성을 설정할 수 있습니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.**| optional |
  | hoverColor | string | subRow에 마우스를 hover 했을 때 발생하는 배경색을 설정할 수 있습니다. <br/> **`useParentRowUi`가 `true`일 때만 작동합니다.** | optional |

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

### 3.6 useSubRowContents

- `TableProvider`의 `subRowContents`에 전달할 상태와 상태 관리 함수를 반환하는 커스텀 훅입니다.
- 훅이 반환하는 값은 아래와 같습니다.
  | Returned Value | Type | Explain |
  | ------------------- | ------------------------------------------- | -------------------------------------------------- |
  | `subRowContents` | `Array<object[]>` | `TableProvider`의 `subRowContents`로 활용되는 상태 |
  | `setSubRowContents` | `Dispatch<SetStateAction<Array<object[]>>>` | `subRowContents` 상태관리 함수 |

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

## 4. Examples

### 4.1 Basic Table Example

<pre>
import { useTable } from 'rex-table';

const MyTable = () => {
  const table = useTable({ data, columns });

  return (
    <TableProvider table={table}>
      <TableHeader />
      <TableBody />
      <TableFooter />
    </TableProvider>
  );
};
</pre>

### 4.2 Pagination Example

<pre>
const MyTableWithPagination = () => {
  const table = useTable({ data, columns, isPagination: true });

  return (
    <TableProvider table={table}>
      <TableHeader />
      <TableBody />
      <TableFooter />
    </TableProvider>
  );
};
</pre>

### 4.3 SubRow 확장

<pre>
const MyTableWithSubRow = () => {
  const table = useTable({ data, columns });

  return (
    <TableProvider table={table}>
      <TableHeader />
      <TableBody />
      <TableFooter />
      <SubRowComponent />
    </TableProvider>
  );
};
</pre>

## 5. License

- 라이선스 정보
