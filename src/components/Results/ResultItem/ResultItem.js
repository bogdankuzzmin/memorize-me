import './ResultItem.css';

const resultItem = props => {
  const {index, name, fail, time} = props.result;

  return (
    <tr>
      <td className="results__number">{index}</td>
      <td className="results__name">{name}</td>
      <td>{time}</td>
      <td>{fail}</td>
    </tr>
  );
};

export default resultItem;