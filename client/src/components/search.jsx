class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <select value="INBOUND">
          <option value="INBOUND">INBOUND</option>
          <option value="OUTBOUND">OUTBOUND</option>
        </select>
        Date From:
        <input type="date" />
        Date To:
        <input type="date" />
        <input type="button" value="Search" />
      </div>
    );
  }
}