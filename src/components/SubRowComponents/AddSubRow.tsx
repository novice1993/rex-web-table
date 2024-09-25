interface ContentType {
  No: string;
  firstName: string;
  add: string;
}

const AddSubRow = ({ contents }: { contents: Array<object> }) => {
  const subRowData = contents as ContentType[];

  const handleClickRow = (index: number) => {
    alert("this is test success!!" + index);
  };

  return subRowData.map((data, index) => {
    return (
      <div
        key={index}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          border: "1px solid black",
        }}
        onClick={() => handleClickRow(index)}
      >
        <div style={{ flex: "1 0 0" }}>{data.No}</div>
        <div style={{ flex: "1 0 0" }}>{data.firstName}</div>
        <div style={{ flex: "1 0 0" }}>{data.add}</div>
      </div>
    );
  });
};

export default AddSubRow;
