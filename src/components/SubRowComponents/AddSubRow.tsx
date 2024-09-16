interface ContentType {
  no: string;
  name: string;
  add: string;
}

const AddSubRow = ({ contents }: { contents: Array<object> }) => {
  const subRowData = contents as ContentType[];

  return subRowData.map((data, index) => {
    return (
      <div
        key={index}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "1 0 0" }}>{data.no}</div>
        <div style={{ flex: "1 0 0" }}>{data.name}</div>
        <div style={{ flex: "1 0 0" }}>{data.add}</div>
      </div>
    );
  });
};

export default AddSubRow;
